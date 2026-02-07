const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createLicense, updateShop, getLicenses, getLicense } = require('../controllers/inspectorController');

// Create new license (multipart/form-data)
router.post('/licenses', upload.fields([
  { name: 'ownerAadharCardImage', maxCount: 1 },
  { name: 'pharmacistCertificate', maxCount: 1 },
  { name: 'pharmacistSignatureImage', maxCount: 1 },
  { name: 'appointmentDocument', maxCount: 1 }
]), createLicense);

// Update shop details (by shop id)
router.put('/shops/:id', upload.fields([
  { name: 'ownerAadharCardImage', maxCount: 1 },
  { name: 'pharmacistCertificate', maxCount: 1 },
  { name: 'pharmacistSignatureImage', maxCount: 1 },
  { name: 'appointmentDocument', maxCount: 1 }
]), updateShop);

// List licenses
router.get('/licenses', getLicenses);

// Get single license
router.get('/licenses/:id', getLicense);

module.exports = router;
