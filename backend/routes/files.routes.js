const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/fileController');

// POST endpoint to upload file
router.post('/upload', uploadFile);

module.exports = router;
