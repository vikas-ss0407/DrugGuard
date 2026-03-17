const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')

async function getRetailerPurchaseHistory(req, res) {
  try {
    const { retailerId } = req.params

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
  getRetailerPurchaseHistory
}
