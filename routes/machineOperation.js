const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// Controller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

router.post('/', Controller.addmachineOperation);
router.put('/',Controller.updateMachineOperation);
module.exports = router;