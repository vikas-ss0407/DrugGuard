const express = require('express')
const {
	getRetailerPurchaseHistory,
	createRetailerOrder,
	getRetailerApproveStockBills,
	approveRetailerStock
} = require('../controllers/retailerController')

const router = express.Router()

router.post('/orders', createRetailerOrder)
router.get('/:retailerId/approve-stock', getRetailerApproveStockBills)
router.post('/:retailerId/approve-stock/:orderId/approve', approveRetailerStock)
router.get('/:retailerId/purchases', getRetailerPurchaseHistory)

module.exports = router
