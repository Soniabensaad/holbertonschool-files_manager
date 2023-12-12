// routes/index.js
const express = require('express');
const router = express.Router();
const AppController = require('../controllers/appController');

// Create an instance of AppController
const appControllerInstance = new AppController();

// Define the status endpoint
router.get('/status', appControllerInstance.getStatus);
router.get('/stats', appControllerInstance.getStats);

// Add more endpoints as needed

module.exports = router;
