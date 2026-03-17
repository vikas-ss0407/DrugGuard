import { apiRequest } from '../client'

export async function loginWholesaler(username, password) {
  const response = await apiRequest('/api/auth/custom-login', {
    method: 'POST',
    body: JSON.stringify({ role: 'wholesaler', username, password })
  })

  localStorage.setItem('dg_user', JSON.stringify({ role: 'wholesaler', ...response.user }))
  return response
}

export async function createWholesalerSale(payload) {
  return apiRequest('/api/wholesaler/sales', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
