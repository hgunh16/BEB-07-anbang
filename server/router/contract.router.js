const express = require('express');
const contractController = require('../controllers/contract.controller');
const contractRouter = express.Router();

contractRouter.post('/tenantcheck', contractController.tenantcheck);
contractRouter.post('/ownercheck', contractController.ownercheck);
contractRouter.get('/write', contractController.write);
contractRouter.post('/ownercheck', contractController.ownercheck);
contractRouter.post('/make', contractController.make);

module.exports = contractRouter;
