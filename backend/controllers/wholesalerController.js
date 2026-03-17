const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')

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
  createSaleToRetailer
}
