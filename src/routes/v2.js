const express = require('express');
const dataModules = require('../models');
const acl = require('../auth/middleware/acl');
const bearerAuth = require('../auth/middleware/bearer');

const routerV2 = express.Router();

routerV2.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

routerV2.get('/', bearerAuth, handleGetAllV2);
routerV2.post('/', bearerAuth, acl('create'), handleCreateV2);
routerV2.put('/:id', bearerAuth, acl('update'), handleUpdateV2);
routerV2.patch('/:id', bearerAuth, acl('update'), handlePatchV2);
routerV2.delete('/:id', bearerAuth, acl('delete'), handleDeleteV2);

async function handleGetAllV2(req, res, next) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleCreateV2(req, res, next) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdateV2(req, res, next) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handlePatchV2(req, res, next) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDeleteV2(req, res, next) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = routerV2;
