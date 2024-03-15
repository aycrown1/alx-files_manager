const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');

// Status route
router.get('/status', AppController.getStatus);

// Stats route
router.get('/stats', AppController.getStats);

module.exports = router;
