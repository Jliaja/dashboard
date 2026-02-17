const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statscontroller');

router.get('/', getStats);

module.exports = router;
