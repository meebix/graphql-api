const router = require('express').Router();
const controller = require('./mfa-controller');

router.post('/email', controller.email);
router.post('/text', controller.text);
router.post('/phone', controller.phone);

module.exports = router;
