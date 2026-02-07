const pool = require('../config/database');
const uploadPath = process.env.UPLOAD_PATH || 'uploads';
const fs = require('fs');

// Create license application
const createLicense = async (req, res) => {
  try {
    const schema = process.env.DB_SCHEMA || 'Drugapp';

    // Files handled by multer are available at req.files
    const {
      fullName, dateOfBirth, licenseType, shopFirmName, ownershipType,
      doorNo, area, city, post, district, state, pinCode, mobileNumber, email,
      ownerPanCard, ownerAadharNumber, pharmacistName, registrationId, qualification,
      yearsOfExperience, pharmacistDateOfBirth, aadhaarNumber, pharmacistMobile, pharmacistEmail,
      employmentType, totalShopArea, shopLength, shopBreadth, storageAreaAvailable,
      separateScheduleDrugStorage, powerBackupAvailable, acAvailable, acBrand, acModel,
      acCapacity, refrigeratorAvailable, refrigeratorBrand, refrigeratorModel,
      refrigeratorCapacity, refrigeratorTempRange, username, loginPassword, licenseNumber, licenseDocument
    } = req.body;

    // Map file paths
    const ownerAadharPath = req.files?.ownerAadharCardImage?.[0]?.path || null;
    const pharmacistCertificatePath = req.files?.pharmacistCertificate?.[0]?.path || null;
    const pharmacistSignaturePath = req.files?.pharmacistSignatureImage?.[0]?.path || null;
    const appointmentDocumentPath = req.files?.appointmentDocument?.[0]?.path || null;

    const insertQuery = `
      INSERT INTO "${schema}".licenses (
        license_number, license_type, shop_name, owner_name, data,
        owner_aadhar_path, pharmacist_certificate_path, pharmacist_signature_path,
        appointment_document_path, license_document
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;
    `;

    const dataJson = {
      fullName, dateOfBirth, licenseType, shopFirmName, ownershipType,
      doorNo, area, city, post, district, state, pinCode, mobileNumber, email,
      ownerPanCard, ownerAadharNumber, pharmacistName, registrationId, qualification,
      yearsOfExperience, pharmacistDateOfBirth, aadhaarNumber, pharmacistMobile, pharmacistEmail,
      employmentType, totalShopArea, shopLength, shopBreadth, storageAreaAvailable,
      separateScheduleDrugStorage, powerBackupAvailable, acAvailable, acBrand, acModel,
      acCapacity, refrigeratorAvailable, refrigeratorBrand, refrigeratorModel,
      refrigeratorCapacity, refrigeratorTempRange, username
    };

    // keep username inside the JSON data to be compatible with existing schema
    const values = [
      licenseNumber || null,
      licenseType || null,
      shopFirmName || null,
      fullName || null,
      JSON.stringify(dataJson),
      ownerAadharPath,
      pharmacistCertificatePath,
      pharmacistSignaturePath,
      appointmentDocumentPath,
      licenseDocument || null
    ];

    const result = await pool.query(insertQuery, values);
    return res.status(201).json({ success: true, message: 'License saved', license: result.rows[0] });
  } catch (error) {
    console.error('createLicense error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving license' });
  }
};

// Update shop details (by shop id or license number)
const updateShop = async (req, res) => {
  try {
    const schema = process.env.DB_SCHEMA || 'Drugapp';
    const shopId = req.params.id; // could be numeric id or shop_id

    const dataFields = req.body || {};

    const ownerAadharPath = req.files?.ownerAadharCardImage?.[0]?.path || null;
    const pharmacistCertificatePath = req.files?.pharmacistCertificate?.[0]?.path || null;
    const pharmacistSignaturePath = req.files?.pharmacistSignatureImage?.[0]?.path || null;
    const appointmentDocumentPath = req.files?.appointmentDocument?.[0]?.path || null;

    // Try to update by shop_id or numeric id
    const selectQuery = `SELECT * FROM "${schema}".shops WHERE shop_id = $1 OR id = $2 LIMIT 1`;
    const selectRes = await pool.query(selectQuery, [shopId, shopId]);

    if (selectRes.rows.length === 0) {
      // Insert new record if not exists
      const insertQuery = `
        INSERT INTO "${schema}".shops (shop_id, license_number, shop_name, owner_name, data, owner_aadhar_path, pharmacist_certificate_path, pharmacist_signature_path, appointment_document_path)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;
      `;
      const values = [
        shopId,
        dataFields.licenseNumber || null,
        dataFields.shopFirmName || dataFields.shop_name || null,
        dataFields.fullName || dataFields.owner_name || null,
        JSON.stringify(dataFields),
        ownerAadharPath,
        pharmacistCertificatePath,
        pharmacistSignaturePath,
        appointmentDocumentPath
      ];
      const ins = await pool.query(insertQuery, values);
      return res.status(201).json({ success: true, message: 'Shop created', shop: ins.rows[0] });
    }

    const existing = selectRes.rows[0];
    const mergedData = { ...(existing.data || {}), ...dataFields };

    const updateQuery = `
      UPDATE "${schema}".shops SET
        license_number = $1,
        shop_name = $2,
        owner_name = $3,
        data = $4,
        owner_aadhar_path = COALESCE($5, owner_aadhar_path),
        pharmacist_certificate_path = COALESCE($6, pharmacist_certificate_path),
        pharmacist_signature_path = COALESCE($7, pharmacist_signature_path),
        appointment_document_path = COALESCE($8, appointment_document_path),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9 OR shop_id = $10 RETURNING *;
    `;

    const updateValues = [
      dataFields.licenseNumber || existing.license_number,
      dataFields.shopFirmName || existing.shop_name,
      dataFields.fullName || existing.owner_name,
      JSON.stringify(mergedData),
      ownerAadharPath,
      pharmacistCertificatePath,
      pharmacistSignaturePath,
      appointmentDocumentPath,
      existing.id,
      shopId
    ];

    const upd = await pool.query(updateQuery, updateValues);
    return res.status(200).json({ success: true, message: 'Shop updated', shop: upd.rows[0] });
  } catch (error) {
    console.error('updateShop error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating shop' });
  }
};

// List licenses
const getLicenses = async (req, res) => {
  try {
    const schema = process.env.DB_SCHEMA || 'Drugapp';
    // If the physical `username` column exists use it, otherwise extract from JSONB `data`.
    const colCheck = `
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = $1 AND table_name = 'licenses' AND column_name = 'username' LIMIT 1
    `;
    const colRes = await pool.query(colCheck, [schema.toLowerCase()]);

    let q;
    if (colRes.rows.length > 0) {
      q = `SELECT id, license_number, shop_name, username, owner_name, data, created_at FROM "${schema}".licenses ORDER BY created_at DESC`;
    } else {
      q = `SELECT id, license_number, shop_name, (data->>'username') as username, owner_name, data, created_at FROM "${schema}".licenses ORDER BY created_at DESC`;
    }

    const r = await pool.query(q);
    return res.status(200).json({ success: true, licenses: r.rows });
  } catch (error) {
    console.error('getLicenses error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching licenses' });
  }
};

// Get single license by id
const getLicense = async (req, res) => {
  try {
    const schema = process.env.DB_SCHEMA || 'Drugapp';
    const id = req.params.id;
    const q = `SELECT * FROM "${schema}".licenses WHERE id = $1 LIMIT 1`;
    const r = await pool.query(q, [id]);
    if (r.rows.length === 0) return res.status(404).json({ success: false, message: 'License not found' });
    return res.status(200).json({ success: true, license: r.rows[0] });
  } catch (error) {
    console.error('getLicense error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching license' });
  }
};

module.exports = { createLicense, updateShop, getLicenses, getLicense };

