import express from 'express';

import auth from '../middleware/middleware.js'

import * as AuthController from './authController.js'

const router = express.Router();


router.post('/signin', AuthController.signIn);
router.post('/signup', AuthController.signUp);

export default router;