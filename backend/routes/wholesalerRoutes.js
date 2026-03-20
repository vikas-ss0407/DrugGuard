const express = require('express')
const {
	createSaleToRetailer,
	getManufacturerMedicines,
	createPurchaseFromManufacturer,
	getWholesalerApproveStockBills,
	approveWholesalerStock
} = require('../controllers/wholesalerController')

const router = express.Router()

router.post('/sales', createSaleToRetailer)
router.get('/manufacturer-medicines', getManufacturerMedicines)
router.post('/manufacturer-purchases', createPurchaseFromManufacturer)
router.get('/:wholesalerId/approve-stock', getWholesalerApproveStockBills)
router.post('/:wholesalerId/approve-stock/:purchaseId/approve', approveWholesalerStock)

module.exports = router
