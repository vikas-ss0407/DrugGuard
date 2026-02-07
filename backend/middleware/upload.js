const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const UPLOAD_PATH = process.env.UPLOAD_PATH || 'uploads';

// ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9_-]/gi, '_');
    const unique = `${Date.now()}_${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, `${base}_${unique}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10) }
});

module.exports = upload;
