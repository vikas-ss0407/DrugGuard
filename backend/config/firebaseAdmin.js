const admin = require('firebase-admin')

function getServiceAccountFromEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !privateKey) {
    return null
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n')
  }
}

if (!admin.apps.length) {
  const serviceAccount = getServiceAccountFromEnv()

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })
  }
}

const db = admin.firestore()
const auth = admin.auth()

module.exports = {
  admin,
  db,
  auth
}
