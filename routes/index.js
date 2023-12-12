// routes/index.js
const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController'); 
const UsersController = require('../controllers/UsersController')

// Create an instance of AppController
const appControllerInstance = new AppController();
const usersControllerInstance = new UsersController();

// Define the status endpoint
router.get('/status', appControllerInstance.getStatus);
router.get('/stats', appControllerInstance.getStats);

router.post('/users', usersControllerInstance.postNew);

// Add more endpoints as needed

module.exports = router;
