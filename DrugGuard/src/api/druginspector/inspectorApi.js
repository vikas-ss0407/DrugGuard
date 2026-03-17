import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config/firebaseClient'
import { apiRequest } from '../client'

export async function loginInspector(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  const user = result.user
  const profile = await apiRequest(`/api/inspector/profile?email=${encodeURIComponent(user.email || '')}`)

  const session = {
    role: 'inspector',
    uid: user.uid,
    email: user.email,
    district: profile.district || ''
  }

  localStorage.setItem('dg_user', JSON.stringify(session))
  return session
}

export async function createLicenseByInspector(payload) {
  return apiRequest('/api/inspector/licenses', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function getInspectorVisibleRetailers(district) {
  return apiRequest(`/api/inspector/districts/${encodeURIComponent(district)}/retailers-visible`)
}
