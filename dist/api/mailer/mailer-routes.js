'use strict';

const router = require('express').Router();
const controller = require('./mailer-controller');

router.put('/list/:listId', controller.updateList);

module.exports = router;