const express = require('express')
const { createLicense, getInspectorProfile, getInspectorRetailerVisibility } = require('../controllers/inspectorController')

const router = express.Router()

router.post('/licenses', createLicense)
router.get('/profile', getInspectorProfile)
router.get('/districts/:district/retailers-visible', getInspectorRetailerVisibility)

module.exports = router
