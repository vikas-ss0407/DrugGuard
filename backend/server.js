const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const inspectorRoutes = require('./routes/inspectorRoutes')
const wholesalerRoutes = require('./routes/wholesalerRoutes')
const retailerRoutes = require('./routes/retailerRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/inspector', inspectorRoutes)
app.use('/api/wholesaler', wholesalerRoutes)
app.use('/api/retailer', retailerRoutes)

app.listen(PORT, () => {
  console.log(`DrugGuard backend running on port ${PORT}`)
})
