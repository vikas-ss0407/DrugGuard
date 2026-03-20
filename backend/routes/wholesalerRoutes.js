const express = require('express')
const {
	createSaleToRetailer,
	getManufacturerMedicines,
	createPurchaseFromManufacturer
} = require('../controllers/wholesalerController')

const router = express.Router()

router.post('/sales', createSaleToRetailer)
router.get('/manufacturer-medicines', getManufacturerMedicines)
router.post('/manufacturer-purchases', createPurchaseFromManufacturer)

module.exports = router
