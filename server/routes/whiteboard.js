import express from 'express';
const router = express.Router();

import * as  AuthCtrl from '../controllers/auth.js';

router.post('/register', AuthCtrl.register)
router.post('/login', AuthCtrl.login)
router.post('/createboard',  AuthCtrl.createboard)
router.post('/logout', AuthCtrl.logout)
router.post('/refresh-token', AuthCtrl.refreshToken)
/* router.post('resendConfirmEmail', AuthCtrl.resendConfirmEmail) */
router.post('/confirmPasswordChange', AuthCtrl.confirmPasswordChange)
router.post('/confirm', AuthCtrl.confirm)
router.post('/forgotpassword', AuthCtrl.forgotPassword)

/* router.get('/user-products',
           AuthCtrl.onlyAuthUser,
           AuthCtrl.onlyAdmin,
           ProductCtrl.getInstructorProducts);
router.get('/:id', ProductCtrl.getProductById); */

export default router;
