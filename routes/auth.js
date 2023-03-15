const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// conntroller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

// routes
router.post('/login', Controller.login);
//router.get('/profile', [auth], Controller.getMyProfile);

module.exports = router;
