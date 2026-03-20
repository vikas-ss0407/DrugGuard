const express = require('express')
const {
	getRetailerWholesalers,
	getRetailerWholesalerCatalog,
	getRetailerSellCatalog,
	createRetailerCustomerSale,
	getRetailerPurchaseHistory,
	createRetailerOrder,
	getRetailerApproveStockBills,
	approveRetailerStock
} = require('../controllers/retailerController')

const router = express.Router()

router.get('/:retailerId/wholesalers', getRetailerWholesalers)
router.get('/:retailerId/wholesalers/:wholesalerId/catalog', getRetailerWholesalerCatalog)
router.get('/:retailerId/sell-catalog', getRetailerSellCatalog)
router.post('/sales', createRetailerCustomerSale)
router.post('/orders', createRetailerOrder)
router.get('/:retailerId/approve-stock', getRetailerApproveStockBills)
router.post('/:retailerId/approve-stock/:orderId/approve', approveRetailerStock)
router.get('/:retailerId/purchases', getRetailerPurchaseHistory)

module.exports = router
