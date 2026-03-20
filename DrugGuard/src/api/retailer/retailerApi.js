import { apiRequest } from '../client'

export async function loginRetailer(username, password) {
  const response = await apiRequest('/api/auth/custom-login', {
    method: 'POST',
    body: JSON.stringify({ role: 'retailer', username, password })
  })

  localStorage.setItem('dg_user', JSON.stringify({ role: 'retailer', ...response.user }))
  return response
}

export async function getRetailerPurchases(retailerId) {
  return apiRequest(`/api/retailer/${encodeURIComponent(retailerId)}/purchases`)
}

export async function getRetailerWholesalers(retailerId) {
  return apiRequest(`/api/retailer/${encodeURIComponent(retailerId)}/wholesalers`)
}

export async function getRetailerWholesalerCatalog(retailerId, wholesalerId) {
  return apiRequest(`/api/retailer/${encodeURIComponent(retailerId)}/wholesalers/${encodeURIComponent(wholesalerId)}/catalog`)
}

export async function getRetailerSellCatalog(retailerId) {
  return apiRequest(`/api/retailer/${encodeURIComponent(retailerId)}/sell-catalog`)
}

export async function createRetailerCustomerSale(payload) {
  return apiRequest('/api/retailer/sales', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function createRetailerOrder(payload) {
  return apiRequest('/api/retailer/orders', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function getRetailerApproveStockBills(retailerId) {
  return apiRequest(`/api/retailer/${encodeURIComponent(retailerId)}/approve-stock`)
}

export async function approveRetailerStock(retailerId, orderId, acceptedMedicineIds) {
  return apiRequest(`/api/retailer/${encodeURIComponent(retailerId)}/approve-stock/${encodeURIComponent(orderId)}/approve`, {
    method: 'POST',
    body: JSON.stringify({ acceptedMedicineIds })
  })
}
