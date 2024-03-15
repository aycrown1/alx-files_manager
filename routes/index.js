const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');


// Status route
router.get('/status', AppController.getStatus);

// Post routes
router.post('/users', UsersController.postNew);

// Stats route
router.get('/stats', AppController.getStats);

module.exports = router;
