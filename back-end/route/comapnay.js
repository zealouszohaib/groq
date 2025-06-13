const express = require('express');
const { getCompanyById } = require('../controller/company');
const router = express.Router();

// GET /company/:id
router.get('/:id', getCompanyById);

module.exports = router;