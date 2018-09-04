import { Router } from 'express';
import userCtrl from './api/user/user-ctrl';
import codeCtrl from './api/code/code-ctrl';
import securityQuestionCtrl from './api/security-question/security-question-ctrl';
import mfaCtrl from './api/mfa/mfa-ctrl';

const router = new Router();

// Users
router.route('/users')
  .post(userCtrl.create);

router.route('/users/:userId')
  .get(userCtrl.retrieve)
  .patch(userCtrl.update);

// Codes
router.post('/codes', codeCtrl.generate);
router.patch('/codes/:codeId', codeCtrl.validate);

// Security questions
router.route('/users/:userId/security-questions')
  .get(securityQuestionCtrl.retrieveAll)
  .post(securityQuestionCtrl.create)
  .patch(securityQuestionCtrl.update);

router.get('/users/:userId/security-questions/:shortName', securityQuestionCtrl.retrieveOne);

// Multi-factor authentication
router.post('/users/:userId/mfa', mfaCtrl.send);

export default router;
