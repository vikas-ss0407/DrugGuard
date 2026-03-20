const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')

async function loginCustomRole(req, res) {
  try {
    const { role, username, password } = req.body

    if (!role || !username || !password) {
      return res.status(400).json({ message: 'role, username, and password are required' })
    }

    if (role !== 'wholesaler' && role !== 'retailer') {
      return res.status(400).json({ message: 'Unsupported role for this endpoint' })
    }

    const collectionName = role === 'wholesaler' ? collections.WHOLESALERS : collections.RETAILERS
    const snapshot = await db
      .collection(collectionName)
      .where('username', '==', username)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const userDoc = snapshot.docs[0]
    const userData = userDoc.data()

    if (userData.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    return res.json({
      role,
      user: {
        id: userDoc.id,
        uid: userDoc.id,
        username: userData.username,
        district: userData.district,
        inspectorDistrict: userData.inspectorDistrict || null,
        shopFirmName: userData.shopFirmName || ''
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  loginCustomRole
}
