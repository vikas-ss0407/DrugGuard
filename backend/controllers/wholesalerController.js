const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')
const { getSeedCatalogDocs } = require('../services/manufacturerCatalogService')

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

    const purchase = {
      sellerRole: 'manufacturer',
      buyerRole: 'wholesaler',
      wholesalerId,
      wholesalerName: wholesalerName || '',
      manufacturer,
      items: purchaseItems,
      totalAmount: Number(totalAmount.toFixed(2)),
      createdAt: new Date().toISOString()
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

async function createSaleToRetailer(req, res) {
  try {
    const { wholesalerId, retailerId, productName, quantity, district } = req.body

    if (!wholesalerId || !retailerId || !productName || !quantity) {
      return res.status(400).json({ message: 'wholesalerId, retailerId, productName and quantity are required' })
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
  createPurchaseFromManufacturer
}
