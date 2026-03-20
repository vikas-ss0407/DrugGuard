const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')
const { getSeedCatalogDocs } = require('../services/manufacturerCatalogService')

async function ensureShopExists(collectionName, id) {
  if (!id) return null
  const doc = await db.collection(collectionName).doc(String(id)).get()
  return doc.exists ? { id: doc.id, ...doc.data() } : null
}

function deriveManufactureDate(expiryDate, fallbackDate) {
  if (expiryDate) {
    const expiry = new Date(expiryDate)
    if (!Number.isNaN(expiry.getTime())) {
      expiry.setFullYear(expiry.getFullYear() - 2)
      return expiry.toISOString().slice(0, 10)
    }
  }

  if (fallbackDate) {
    const fallback = new Date(fallbackDate)
    if (!Number.isNaN(fallback.getTime())) {
      return fallback.toISOString().slice(0, 10)
    }
  }

  return new Date().toISOString().slice(0, 10)
}

async function ensureManufacturerCatalogSeeded() {
  const firstDoc = await db.collection(collections.MANUFACTURER_MEDICINES).limit(1).get()
  
  // Check if data has incorrect dates (from old seed logic)
  let needsReset = false
  if (!firstDoc.empty) {
    const sample = firstDoc.docs[0].data()
    const expiryYear = sample.expiryDate ? parseInt(sample.expiryDate.substring(0, 4)) : null
    // If expiry dates are 2028+, we have old bad data - need to reset
    if (expiryYear && expiryYear >= 2028) {
      needsReset = true
    }
  }

  if (!firstDoc.empty && !needsReset) {
    const existingSnapshot = await db.collection(collections.MANUFACTURER_MEDICINES).get()
    const docsNeedingBackfill = existingSnapshot.docs.filter((doc) => {
      const data = doc.data()
      return !data.manufactureDate
    })

    for (let i = 0; i < docsNeedingBackfill.length; i += 400) {
      const chunk = docsNeedingBackfill.slice(i, i + 400)
      const batch = db.batch()

      chunk.forEach((doc) => {
        const data = doc.data()
        batch.update(doc.ref, {
          manufactureDate: deriveManufactureDate(data.expiryDate, data.createdAt),
          updatedAt: new Date().toISOString()
        })
      })

      await batch.commit()
    }

    return
  }

  // If needs reset, delete all old documents in batches
  if (needsReset) {
    const snapshot = await db.collection(collections.MANUFACTURER_MEDICINES).get()
    const chunkSize = 400

    for (let i = 0; i < snapshot.docs.length; i += chunkSize) {
      const chunk = snapshot.docs.slice(i, i + chunkSize)
      const batch = db.batch()

      chunk.forEach((doc) => {
        batch.delete(doc.ref)
      })

      await batch.commit()
    }
  }

  const catalogDocs = getSeedCatalogDocs()
  const chunkSize = 400

  for (let i = 0; i < catalogDocs.length; i += chunkSize) {
    const chunk = catalogDocs.slice(i, i + chunkSize)
    const batch = db.batch()

    chunk.forEach((docData) => {
      const ref = db.collection(collections.MANUFACTURER_MEDICINES).doc()
      batch.set(ref, docData)
    })

    await batch.commit()
  }
}

async function getManufacturerMedicines(req, res) {
  try {
    const { manufacturer } = req.query
    let query = db.collection(collections.MANUFACTURER_MEDICINES)

    if (manufacturer) {
      query = query.where('manufacturerName', '==', manufacturer)
    }

    const snapshot = await query.get()
    const medicines = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        manufactureDate: data.manufactureDate || deriveManufactureDate(data.expiryDate, data.createdAt)
      }
    })

    const manufacturers = Array.from(new Set(medicines.map((m) => m.manufacturerName))).sort()

    return res.json({
      manufacturers,
      medicines
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function createPurchaseFromManufacturer(req, res) {
  try {
    const { wholesalerId, wholesalerName, manufacturer, items } = req.body

    if (!wholesalerId || !manufacturer || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'wholesalerId, manufacturer and items are required' })
    }

    const wholesalerShop = await ensureShopExists(collections.WHOLESALERS, wholesalerId)
    if (!wholesalerShop) {
      return res.status(404).json({ message: 'Wholesaler shop not found for wholesalerId' })
    }

    const purchaseItems = []
    let totalAmount = 0

    for (const item of items) {
      const quantity = Number(item.quantity)
      if (!item.medicineId || !Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Each item must have medicineId and quantity > 0' })
      }

      const medicineDoc = await db
        .collection(collections.MANUFACTURER_MEDICINES)
        .doc(String(item.medicineId))
        .get()

      if (!medicineDoc.exists) {
        return res.status(404).json({ message: `Medicine not found for id: ${item.medicineId}` })
      }

      const medicineData = medicineDoc.data()
      const amount = Number((Number(medicineData.rate) * quantity).toFixed(2))

      purchaseItems.push({
        medicineId: medicineDoc.id,
        medicineName: medicineData.medicineName,
        manufacturerName: medicineData.manufacturerName,
        type: medicineData.type,
        isNarcotic: Boolean(medicineData.isNarcotic),
        drugClass: medicineData.drugClass || 'normal',
        isOriginal: medicineData.isOriginal !== false,
        packType: medicineData.packType,
        packSize: medicineData.packSize,
        batchNumber: medicineData.batchNumber,
        manufactureDate: medicineData.manufactureDate || deriveManufactureDate(medicineData.expiryDate, medicineData.createdAt),
        expiryDate: medicineData.expiryDate,
        mrp: Number(medicineData.mrp),
        rate: Number(medicineData.rate),
        colorCode: medicineData.colorCode || '#22c55e',
        quantity,
        amount
      })

      totalAmount += amount
    }

    const nowIso = new Date().toISOString()

    const purchase = {
      billNo: `MFR-${Date.now()}`,
      sellerRole: 'manufacturer',
      buyerRole: 'wholesaler',
      wholesalerId,
      wholesalerName: wholesalerName || '',
      manufacturer,
      orderType: 'manufacturer_purchase_order',
      orderStatus: 'pending_approval',
      deliveredDate: nowIso.slice(0, 10),
      items: purchaseItems,
      totalAmount: Number(totalAmount.toFixed(2)),
      createdAt: nowIso,
      updatedAt: nowIso
    }

    const purchaseRef = await db.collection(collections.WHOLESALER_PURCHASES).add(purchase)

    return res.status(201).json({
      message: 'Purchase from manufacturer recorded',
      purchaseId: purchaseRef.id,
      totalAmount: purchase.totalAmount
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getWholesalerApproveStockBills(req, res) {
  try {
    const { wholesalerId } = req.params

    const wholesalerShop = await ensureShopExists(collections.WHOLESALERS, wholesalerId)
    if (!wholesalerShop) {
      return res.status(404).json({ message: 'Wholesaler shop not found' })
    }

    const snapshot = await db
      .collection(collections.WHOLESALER_PURCHASES)
      .where('wholesalerId', '==', wholesalerId)
      .get()

    const bills = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((tx) => tx.orderStatus !== 'approved')
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
      .map((tx) => ({
        id: tx.id,
        billNo: tx.billNo || tx.id,
        manufacturer: tx.manufacturer || 'Unknown Manufacturer',
        deliveredDate: tx.deliveredDate || String(tx.createdAt || '').slice(0, 10),
        totalAmount: Number(tx.totalAmount || 0),
        orderStatus: tx.orderStatus || 'pending_approval',
        medicines: Array.isArray(tx.items)
          ? tx.items.map((item) => ({
              id: String(item.medicineId || item.medicineName || ''),
              name: item.medicineName || '-',
              batch: item.batchNumber || '-',
              quantity: Number(item.quantity || 0),
              price: Number(item.rate || 0),
              mrp: Number(item.mrp || 0),
              expiry: item.expiryDate || null,
              amount: Number(item.amount || Number(item.rate || 0) * Number(item.quantity || 0)),
              medicineId: item.medicineId || null,
              packType: item.packType || null,
              packSize: item.packSize || null,
              type: item.type || null,
              isNarcotic: Boolean(item.isNarcotic)
            }))
          : []
      }))

    return res.json({ wholesalerId, bills })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function approveWholesalerStock(req, res) {
  try {
    const { wholesalerId, purchaseId } = req.params
    const { acceptedMedicineIds } = req.body

    if (!Array.isArray(acceptedMedicineIds) || acceptedMedicineIds.length === 0) {
      return res.status(400).json({ message: 'acceptedMedicineIds is required' })
    }

    const wholesalerShop = await ensureShopExists(collections.WHOLESALERS, wholesalerId)
    if (!wholesalerShop) {
      return res.status(404).json({ message: 'Wholesaler shop not found' })
    }

    const ref = db.collection(collections.WHOLESALER_PURCHASES).doc(purchaseId)
    const doc = await ref.get()

    if (!doc.exists) {
      return res.status(404).json({ message: 'Purchase order not found' })
    }

    const purchase = doc.data()
    if (purchase.wholesalerId !== wholesalerId) {
      return res.status(403).json({ message: 'You are not allowed to update this purchase' })
    }

    const items = Array.isArray(purchase.items) ? purchase.items : []
    const acceptedSet = new Set(acceptedMedicineIds.map((id) => String(id)))
    const acceptedItems = items.filter((item) => acceptedSet.has(String(item.medicineId || item.medicineName || '')))
    const pendingItems = items.filter((item) => !acceptedSet.has(String(item.medicineId || item.medicineName || '')))

    if (acceptedItems.length === 0) {
      return res.status(400).json({ message: 'Select at least one medicine to approve' })
    }

    const nowIso = new Date().toISOString()

    for (const item of acceptedItems) {
      const medicineId = String(item.medicineId || '')
      const medicineName = item.medicineName || ''
      const batch = item.batchNumber || ''
      const quantity = Number(item.quantity || 0)

      if ((!medicineId && !medicineName) || quantity <= 0) {
        continue
      }

      let existingSnapshot = await db
        .collection(collections.WHOLESALER_STOCK)
        .where('wholesalerId', '==', wholesalerId)
        .where('medicineId', '==', medicineId)
        .where('batch', '==', batch)
        .limit(1)
        .get()

      if (existingSnapshot.empty) {
        existingSnapshot = await db
          .collection(collections.WHOLESALER_STOCK)
          .where('wholesalerId', '==', wholesalerId)
          .where('medicineName', '==', medicineName)
          .where('batch', '==', batch)
          .limit(1)
          .get()
      }

      if (!existingSnapshot.empty) {
        const existingDoc = existingSnapshot.docs[0]
        const existingQty = Number(existingDoc.data().quantity || 0)

        await existingDoc.ref.update({
          quantity: existingQty + quantity,
          rate: Number(item.rate || 0),
          mrp: Number(item.mrp || 0),
          expiryDate: item.expiryDate || null,
          updatedAt: nowIso
        })
      } else {
        await db.collection(collections.WHOLESALER_STOCK).add({
          wholesalerId,
          medicineId: medicineId || null,
          medicineName,
          batch,
          quantity,
          rate: Number(item.rate || 0),
          mrp: Number(item.mrp || 0),
          expiryDate: item.expiryDate || null,
          packType: item.packType || null,
          packSize: item.packSize || null,
          type: item.type || null,
          isNarcotic: Boolean(item.isNarcotic),
          sourcePurchaseId: purchaseId,
          createdAt: nowIso,
          updatedAt: nowIso
        })
      }
    }

    await ref.update({
      orderStatus: 'approved',
      acceptedMedicineIds: acceptedItems.map((item) => String(item.medicineId || item.medicineName || '')),
      pendingMedicineIds: pendingItems.map((item) => String(item.medicineId || item.medicineName || '')),
      approvedAt: nowIso,
      updatedAt: nowIso
    })

    return res.json({
      message: 'Stock approval updated successfully',
      orderStatus: 'approved',
      acceptedCount: acceptedItems.length,
      pendingCount: pendingItems.length
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function createSaleToRetailer(req, res) {
  try {
    const { wholesalerId, retailerId, productName, quantity, district } = req.body

    if (!wholesalerId || !retailerId || !productName || !quantity) {
      return res.status(400).json({ message: 'wholesalerId, retailerId, productName and quantity are required' })
    }

    const wholesalerShop = await ensureShopExists(collections.WHOLESALERS, wholesalerId)
    if (!wholesalerShop) {
      return res.status(404).json({ message: 'Wholesaler shop not found for wholesalerId' })
    }

    const retailerShop = await ensureShopExists(collections.RETAILERS, retailerId)
    if (!retailerShop) {
      return res.status(404).json({ message: 'Retailer shop not found for retailerId' })
    }

    const tx = {
      sellerRole: 'wholesaler',
      sellerId: wholesalerId,
      buyerRole: 'retailer',
      buyerId: retailerId,
      productName,
      quantity,
      district: district || null,
      createdAt: new Date().toISOString()
    }

    const ref = await db.collection(collections.TRANSACTIONS).add(tx)
    return res.status(201).json({ message: 'Sale recorded', transactionId: ref.id })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  ensureManufacturerCatalogSeeded,
  createSaleToRetailer,
  getManufacturerMedicines,
  createPurchaseFromManufacturer,
  getWholesalerApproveStockBills,
  approveWholesalerStock
}
