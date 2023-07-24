const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// Controller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

// routes
router.get('/:id', Controller.rejectionView);
router.put('/update', Controller.addNcQty);
router.get('/reason/category', Controller.NCReasonCategories);
router.post('/newReason/', Controller.createNewReason);
router.get('/reason/:reasonType/:machineId', Controller.viewReason);
router.put('/reason/update', Controller.updateReason);

module.exports = router;
