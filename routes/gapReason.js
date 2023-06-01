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
router.get('/:id', Controller.gapReason);
router.post('/update', Controller.createReason);
// router.delete('/delete/:id', Controller.archive);

module.exports = router;
