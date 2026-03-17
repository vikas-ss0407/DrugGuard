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
