const express = require('express')
const { createSaleToRetailer } = require('../controllers/wholesalerController')

const router = express.Router()

router.post('/sales', createSaleToRetailer)

module.exports = router
