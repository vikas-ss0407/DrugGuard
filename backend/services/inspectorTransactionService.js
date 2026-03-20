const { db } = require('../config/firebaseAdmin')
const collections = require('../models/collections')

function chunkArray(items, chunkSize) {
  const chunks = []

  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize))
  }

  return chunks
}

function mapProfileRecord(docId, data) {
  return {
    id: docId,
    name: data.shopFirmName || data.ownerName || data.username || docId,
    licenseNo: data.licenseNumber || '',
    district: data.inspectorDistrict || data.district || ''
  }
}

async function loadProfilesByDistrict(collectionName, district) {
  const snapshot = await db.collection(collectionName).where('inspectorDistrict', '==', district).get()
  const profileMap = new Map()

  for (const doc of snapshot.docs) {
    profileMap.set(doc.id, mapProfileRecord(doc.id, doc.data()))
  }

  return profileMap
}

async function loadProfilesByIds(collectionName, ids) {
  const uniqueIds = Array.from(new Set((ids || []).filter(Boolean)))
  const profileMap = new Map()

  await Promise.all(
    uniqueIds.map(async (id) => {
      const doc = await db.collection(collectionName).doc(id).get()
      if (doc.exists) {
        profileMap.set(id, mapProfileRecord(id, doc.data()))
      }
    })
  )

  return profileMap
}

async function loadTransactionsByParticipantIds({ roleField, roleValue, participantField, participantIds }) {
  if (!participantIds.length) {
    return []
  }

  const chunks = chunkArray(participantIds, 10)
  const transactions = []

  for (const chunk of chunks) {
    const snapshot = await db
      .collection(collections.TRANSACTIONS)
      .where(roleField, '==', roleValue)
      .where(participantField, 'in', chunk)
      .get()

    for (const doc of snapshot.docs) {
      transactions.push({ id: doc.id, ...doc.data() })
    }
  }

  return transactions
}

function formatTransactionDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10)
}

function sortByCreatedAtDesc(items) {
  return [...items].sort((a, b) => {
    const first = new Date(a.createdAt || 0).getTime()
    const second = new Date(b.createdAt || 0).getTime()
    return second - first
  })
}

async function getInspectorWholesalerSales(district) {
  const wholesalerMap = await loadProfilesByDistrict(collections.WHOLESALERS, district)
  const wholesalerIds = Array.from(wholesalerMap.keys())

  const transactions = await loadTransactionsByParticipantIds({
    roleField: 'sellerRole',
    roleValue: 'wholesaler',
    participantField: 'sellerId',
    participantIds: wholesalerIds
  })

  const retailerIds = Array.from(new Set(transactions.map((item) => item.buyerId).filter(Boolean)))
  const retailerMap = await loadProfilesByIds(collections.RETAILERS, retailerIds)

  const normalizedTransactions = sortByCreatedAtDesc(transactions).map((item) => {
    const wholesaler = wholesalerMap.get(item.sellerId) || { name: item.sellerId || 'Unknown', licenseNo: '' }
    const retailer = retailerMap.get(item.buyerId) || { name: item.buyerId || 'Unknown', licenseNo: '' }

    return {
      id: item.id,
      billId: item.id,
      date: formatTransactionDate(item.createdAt),
      createdAt: item.createdAt || '',
      productName: item.productName || '',
      quantity: Number(item.quantity) || 0,
      wholesalerId: item.sellerId || '',
      wholesalerName: wholesaler.name,
      wholesalerLicenseNo: wholesaler.licenseNo,
      retailerId: item.buyerId || '',
      retailerName: retailer.name,
      retailerLicenseNo: retailer.licenseNo
    }
  })

  return {
    district,
    transactions: normalizedTransactions
  }
}

async function getInspectorRetailerPurchases(district) {
  const retailerMap = await loadProfilesByDistrict(collections.RETAILERS, district)
  const retailerIds = Array.from(retailerMap.keys())

  const transactions = await loadTransactionsByParticipantIds({
    roleField: 'buyerRole',
    roleValue: 'retailer',
    participantField: 'buyerId',
    participantIds: retailerIds
  })

  const wholesalerIds = Array.from(new Set(transactions.map((item) => item.sellerId).filter(Boolean)))
  const wholesalerMap = await loadProfilesByIds(collections.WHOLESALERS, wholesalerIds)

  const normalizedTransactions = sortByCreatedAtDesc(transactions).map((item) => {
    const retailer = retailerMap.get(item.buyerId) || { name: item.buyerId || 'Unknown', licenseNo: '' }
    const wholesaler = wholesalerMap.get(item.sellerId) || { name: item.sellerId || 'Unknown', licenseNo: '' }

    return {
      id: item.id,
      billId: item.id,
      date: formatTransactionDate(item.createdAt),
      createdAt: item.createdAt || '',
      productName: item.productName || '',
      quantity: Number(item.quantity) || 0,
      retailerId: item.buyerId || '',
      retailerName: retailer.name,
      retailerLicenseNo: retailer.licenseNo,
      wholesalerId: item.sellerId || '',
      wholesalerName: wholesaler.name,
      wholesalerLicenseNo: wholesaler.licenseNo
    }
  })

  return {
    district,
    transactions: normalizedTransactions
  }
}

module.exports = {
  getInspectorWholesalerSales,
  getInspectorRetailerPurchases
}