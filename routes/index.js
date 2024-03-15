const express = require('express');
const router = express.Router();

const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');


// Status route
router.get('/status', AppController.getStatus);
router.get('/connect', AuthController.getConnect); 
router.get('/disconnect', AuthController.getDisconnect);

// Post routes
router.post('/users', UsersController.postNew);

// Stats route
router.get('/stats', AppController.getStats);

module.exports = router;
