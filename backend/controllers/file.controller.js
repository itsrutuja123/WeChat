const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Timestamp to prevent filename conflicts
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif|pdf|docx|mp4/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    }
    cb(new Error('File type not allowed'));
  },
}).single('file'); // Accepts a single file with the name 'file'

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  });
};

module.exports = { uploadFile };
