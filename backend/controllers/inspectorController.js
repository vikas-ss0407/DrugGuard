const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')

async function createLicense(req, res) {
  try {
    const { inspectorEmail, inspectorDistrict, licenseType, loginUsername, loginPassword } = req.body

    if (!inspectorEmail || !inspectorDistrict || !licenseType || !loginUsername || !loginPassword) {
      return res.status(400).json({
        message: 'inspectorEmail, inspectorDistrict, licenseType, loginUsername and loginPassword are required'
      })
    }

    const payload = {
      ...req.body,
      inspectorDistrict,
      createdByInspectorEmail: inspectorEmail,
      createdAt: new Date().toISOString()
    }

    const licenseRef = await db.collection(collections.LICENSES).add(payload)

    const targetCollection = licenseType === 'Wholesale' ? collections.WHOLESALERS : collections.RETAILERS
    const accountDoc = {
      username: loginUsername,
      password: loginPassword,
      district: req.body.district || inspectorDistrict,
      inspectorDistrict,
      licenseId: licenseRef.id,
      shopFirmName: req.body.shopFirmName || '',
      ownerName: req.body.fullName || '',
      createdAt: new Date().toISOString()
    }

    await db.collection(targetCollection).doc(loginUsername).set(accountDoc)

    return res.status(201).json({
      message: 'License created successfully',
      licenseId: licenseRef.id,
      accountRole: licenseType === 'Wholesale' ? 'wholesaler' : 'retailer',
      username: loginUsername
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getInspectorProfile(req, res) {
  try {
    const { email } = req.query
    if (!email) {
      return res.status(400).json({ message: 'email is required' })
    }

    const snapshot = await db
      .collection(collections.INSPECTORS)
      .where('email', '==', email)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Inspector profile not found. Run seed script first.' })
    }

    const doc = snapshot.docs[0]
    return res.json({ id: doc.id, ...doc.data() })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getInspectorRetailerVisibility(req, res) {
  try {
    const { district } = req.params

    const localRetailersSnapshot = await db
      .collection(collections.RETAILERS)
      .where('inspectorDistrict', '==', district)
      .get()

    const localRetailers = localRetailersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), source: 'local' }))

    const wholesalersSnapshot = await db
      .collection(collections.WHOLESALERS)
      .where('inspectorDistrict', '==', district)
      .get()

    const wholesalerIds = wholesalersSnapshot.docs.map((doc) => doc.id)

    let externalRetailerMap = new Map()
    if (wholesalerIds.length > 0) {
      for (let i = 0; i < wholesalerIds.length; i += 10) {
        const wholesalerChunk = wholesalerIds.slice(i, i + 10)
        const txSnapshot = await db
          .collection(collections.TRANSACTIONS)
          .where('sellerRole', '==', 'wholesaler')
          .where('sellerId', 'in', wholesalerChunk)
          .get()

        for (const txDoc of txSnapshot.docs) {
          const tx = txDoc.data()
          if (!tx.buyerId || tx.buyerRole !== 'retailer') {
            continue
          }

          if (externalRetailerMap.has(tx.buyerId)) {
            continue
          }

          const retailerDoc = await db.collection(collections.RETAILERS).doc(tx.buyerId).get()
          if (retailerDoc.exists) {
            const data = retailerDoc.data()
            if (data.inspectorDistrict !== district) {
              externalRetailerMap.set(tx.buyerId, {
                id: tx.buyerId,
                ...data,
                source: 'cross-district'
              })
            }
          }
        }
      }
    }

    return res.json({
      district,
      localRetailers,
      crossDistrictRetailers: Array.from(externalRetailerMap.values())
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createLicense,
  getInspectorProfile,
  getInspectorRetailerVisibility
}
