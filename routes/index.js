// routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController'); 

function controllerRouting(app) {
    const router = express.Router();
    app.use('/', router);
  
    router.get('/status', (req, res) => {
      AppController.getStatus(req, res);
    });
  
    router.get('/stats', (req, res) => {
      AppController.getStats(req, res);
    });
}

export default controllerRouting;
