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
router.post('/', Controller.createPlan);
router.get('/:id', Controller.viewPlan);
router.put('/', Controller.update);
router.delete('/delete/:id', Controller.archive);

module.exports = router;
