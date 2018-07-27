const router = require('express').Router();
const controller = require('./auth-controller');

router.post('/signup', controller.signup);
router.post('/confirm-account', controller.confirmAccount);
router.post('/login', controller.login);
router.post('/verify-account', controller.verifyAccount);
router.post('/:verificationType/verify-security-questions', controller.verifySecurityQuestions);
router.post('/reset-password', controller.resetPassword);
router.post('/unlock-account', controller.unlockAccount);
router.post('/resend-confirmation', controller.resendConfirmation);
router.post('/resend-unlock-account', controller.resendUnlockAccount);

module.exports = router;

// Tables

// Users: uuid, first name, last name, email, password, role_id, confirmed, locked, deleted_at
// Roles: name
// Tokens: user_id, type, code, expires
// Logins: user_id, ip, user_agent
// Security Q: short_name, question
// Users_SecQ: user_id, question_id, answer

// -----------------------------------------------------

//  /api/users - new user, create in DB with info
//  /api/users/:id - patch, to add anything later like phone #

//  /api/mfa/:type - post to fire off to type of mfa (email, sms, phone, etc)

//  /api/tokens - post to generate new one  (tokens via MFA)
//  /api/tokens/:id?type=type - get to verify existing one in the wild

//  /api/account/auth - verify user credentials
//  /api/account/auth-token - generate the JWT
//  /api/account/security-questions - verify user's sec. questions

//  /api/mailer/transmissions/send - fires off email
