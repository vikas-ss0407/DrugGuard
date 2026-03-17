const express = require('express')
const { getRetailerPurchaseHistory } = require('../controllers/retailerController')

const router = express.Router()

router.get('/:retailerId/purchases', getRetailerPurchaseHistory)

module.exports = router
