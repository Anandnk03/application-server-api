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

router.get('/:id', Controller.getDownTime);
router.get('/reason/master', Controller.getReason);
router.put('/', Controller.updateReason);
router.post('/', Controller.createReason);

module.exports = router;
