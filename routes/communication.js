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
router.get('/4mType', Controller.Type4M);
router.get('/reasonMaster/:Mid/:id', Controller.gapReasonMaster);
router.get('/machineData', Controller.machineData);
router.get('/component', Controller.component);
router.get('/operation',Controller.getOperationId);
router.get('/machine',Controller. machineName);
router.get('/getComponent',Controller.getComponentData);
router.get('/getOperation',Controller.getOperationData);
router.get('/getMachineOperation',Controller. getMachineOperationData);

module.exports = router;
