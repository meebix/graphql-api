'use strict';

const router = require('express').Router();
const controller = require('./token-controller');

router.post('/', controller.something);
// router.post('/', controller.create);
// router.get('/:id', controller.find);

module.exports = router;