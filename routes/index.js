const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

// Route configuration
router.use('/auth', authRoutes);

module.exports = router;