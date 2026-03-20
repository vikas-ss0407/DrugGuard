const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')

function toIsoDate(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10)
  }
  return parsed.toISOString().slice(0, 10)
}

function buildRetailerOrderBillNo() {
  return `WHL-${Date.now()}`
}

async function ensureShopExists(collectionName, id) {
  if (!id) return null
  const doc = await db.collection(collectionName).doc(String(id)).get()
  return doc.exists ? { id: doc.id, ...doc.data() } : null
}

async function createRetailerOrder(req, res) {
  try {
    const {
      retailerId,
      retailerName,
      wholesalerId,
      wholesalerName,
      district,
      items
    } = req.body

    if (!retailerId || !wholesalerName || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'retailerId, wholesalerName and items are required' })
    }

    const retailerShop = await ensureShopExists(collections.RETAILERS, retailerId)
    if (!retailerShop) {
      return res.status(404).json({ message: 'Retailer shop not found for retailerId' })
    }

    if (wholesalerId) {
      const wholesalerShop = await ensureShopExists(collections.WHOLESALERS, wholesalerId)
      if (!wholesalerShop) {
        return res.status(404).json({ message: 'Wholesaler shop not found for wholesalerId' })
      }
    }

    const normalizedItems = []
    let totalAmount = 0

    for (const item of items) {
      const quantity = Number(item.quantity)
      const rate = Number(item.rate)

      if (!item.medicineName || !Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Each item must include medicineName and valid quantity' })
      }

      const amount = Number((Number.isFinite(rate) ? rate * quantity : 0).toFixed(2))
      totalAmount += amount

      normalizedItems.push({
        id: String(item.id || `${item.medicineName}-${item.batch || ''}`),
        medicineName: item.medicineName,
        batch: item.batch || '',
        quantity,
        rate: Number.isFinite(rate) ? rate : 0,
        mrp: Number.isFinite(Number(item.mrp)) ? Number(item.mrp) : 0,
        expiryDate: item.expiryDate || null,
        amount
      })
    }

    const nowIso = new Date().toISOString()

    const orderPayload = {
      billNo: buildRetailerOrderBillNo(),
      sellerRole: 'wholesaler',
      sellerId: wholesalerId || null,
      sellerName: wholesalerName,
      buyerRole: 'retailer',
      buyerId: retailerId,
      buyerName: retailerName || '',
      district: district || null,
      orderType: 'retailer_purchase_order',
      orderStatus: 'pending_approval',
      deliveredDate: toIsoDate(nowIso),
      items: normalizedItems,
      totalAmount: Number(totalAmount.toFixed(2)),
      createdAt: nowIso,
      updatedAt: nowIso
    }

    const orderRef = await db.collection(collections.TRANSACTIONS).add(orderPayload)

    return res.status(201).json({
      message: 'Retailer order created successfully',
      orderId: orderRef.id,
      billNo: orderPayload.billNo,
      totalAmount: orderPayload.totalAmount
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getRetailerApproveStockBills(req, res) {
  try {
    const { retailerId } = req.params

    const retailerShop = await ensureShopExists(collections.RETAILERS, retailerId)
    if (!retailerShop) {
      return res.status(404).json({ message: 'Retailer shop not found' })
    }

    const snapshot = await db
      .collection(collections.TRANSACTIONS)
      .where('buyerRole', '==', 'retailer')
      .where('buyerId', '==', retailerId)
      .get()

    const bills = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((tx) => tx.orderType === 'retailer_purchase_order')
      .filter((tx) => tx.orderStatus !== 'approved')
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
      .map((tx) => ({
        id: tx.id,
        billNo: tx.billNo || tx.id,
        wholesaler: tx.sellerName || 'Unknown Wholesaler',
        deliveredDate: tx.deliveredDate || toIsoDate(tx.createdAt),
        totalAmount: Number(tx.totalAmount || 0),
        orderStatus: tx.orderStatus || 'pending_approval',
        medicines: Array.isArray(tx.items)
          ? tx.items.map((item) => ({
              id: String(item.id || item.medicineName || Math.random()),
              name: item.medicineName || '-',
              batch: item.batch || '-',
              quantity: Number(item.quantity || 0),
              price: Number(item.rate || 0),
              mrp: Number(item.mrp || 0),
              expiry: item.expiryDate || null,
              amount: Number(item.amount || Number(item.rate || 0) * Number(item.quantity || 0))
            }))
          : []
      }))

    return res.json({ retailerId, bills })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function approveRetailerStock(req, res) {
  try {
    const { retailerId, orderId } = req.params
    const { acceptedMedicineIds } = req.body

    const retailerShop = await ensureShopExists(collections.RETAILERS, retailerId)
    if (!retailerShop) {
      return res.status(404).json({ message: 'Retailer shop not found' })
    }

    if (!Array.isArray(acceptedMedicineIds) || acceptedMedicineIds.length === 0) {
      return res.status(400).json({ message: 'acceptedMedicineIds is required' })
    }

    const ref = db.collection(collections.TRANSACTIONS).doc(orderId)
    const doc = await ref.get()

    if (!doc.exists) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const order = doc.data()
    if (order.buyerRole !== 'retailer' || order.buyerId !== retailerId) {
      return res.status(403).json({ message: 'You are not allowed to update this order' })
    }

    const items = Array.isArray(order.items) ? order.items : []
    const acceptedSet = new Set(acceptedMedicineIds.map((id) => String(id)))

    const acceptedItems = items.filter((item) => acceptedSet.has(String(item.id || item.medicineName || '')))
    const pendingItems = items.filter((item) => !acceptedSet.has(String(item.id || item.medicineName || '')))

    if (acceptedItems.length === 0) {
      return res.status(400).json({ message: 'Select at least one medicine to approve' })
    }

    const nowIso = new Date().toISOString()

    // Move accepted medicines into retailer stock.
    for (const item of acceptedItems) {
      const medicineName = item.medicineName || ''
      const batch = item.batch || ''
      const quantity = Number(item.quantity || 0)

      if (!medicineName || quantity <= 0) {
        continue
      }

      const existingSnapshot = await db
        .collection(collections.RETAILER_STOCK)
        .where('retailerId', '==', retailerId)
        .where('medicineName', '==', medicineName)
        .where('batch', '==', batch)
        .limit(1)
        .get()

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
        await db.collection(collections.RETAILER_STOCK).add({
          retailerId,
          medicineName,
          batch,
          quantity,
          rate: Number(item.rate || 0),
          mrp: Number(item.mrp || 0),
          expiryDate: item.expiryDate || null,
          sourceOrderId: orderId,
          createdAt: nowIso,
          updatedAt: nowIso
        })
      }
    }

    // Once approval is submitted, clear this bill from Approve Stock list.
    const orderStatus = 'approved'

    await ref.update({
      orderStatus,
      acceptedMedicineIds: acceptedItems.map((item) => String(item.id || item.medicineName || '')),
      pendingMedicineIds: pendingItems.map((item) => String(item.id || item.medicineName || '')),
      approvedAt: nowIso,
      updatedAt: nowIso
    })

    return res.json({
      message: 'Stock approval updated successfully',
      orderStatus,
      acceptedCount: acceptedItems.length,
      pendingCount: pendingItems.length
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getRetailerPurchaseHistory(req, res) {
  try {
    const { retailerId } = req.params

    const retailerShop = await ensureShopExists(collections.RETAILERS, retailerId)
    if (!retailerShop) {
      return res.status(404).json({ message: 'Retailer shop not found' })
    }

    const snapshot = await db
      .collection(collections.TRANSACTIONS)
      .where('buyerRole', '==', 'retailer')
      .where('buyerId', '==', retailerId)
      .get()

    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return res.json({ retailerId, transactions: items })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createRetailerOrder,
  getRetailerApproveStockBills,
  approveRetailerStock,
  getRetailerPurchaseHistory
}
