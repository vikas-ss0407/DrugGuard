const express = require('express')
const {
	createSaleToRetailer,
	getWholesalerSalesHistory,
	getWholesalerStock,
	getManufacturerMedicines,
	createPurchaseFromManufacturer,
	getWholesalerSellCatalog,
	getWholesalerApproveStockBills,
	approveWholesalerStock
} = require('../controllers/wholesalerController')

const router = express.Router()

router.post('/sales', createSaleToRetailer)
router.get('/:wholesalerId/sales-history', getWholesalerSalesHistory)
router.get('/:wholesalerId/stock', getWholesalerStock)
router.get('/manufacturer-medicines', getManufacturerMedicines)
router.post('/manufacturer-purchases', createPurchaseFromManufacturer)
router.get('/:wholesalerId/sell-catalog', getWholesalerSellCatalog)
router.get('/:wholesalerId/approve-stock', getWholesalerApproveStockBills)
router.post('/:wholesalerId/approve-stock/:purchaseId/approve', approveWholesalerStock)

module.exports = router
