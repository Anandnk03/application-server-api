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

router.get('/department', Controller.department);
router.get('/module/:id', Controller.modules);
router.get('/machine/:id', Controller.machine);
router.get('/product/:id', Controller.product);

module.exports = router;
