import { Router } from 'express';
const router = new Router();
import * as AuthController from '../controllers/auth.controller';

const authMiddleWare = require('./../controllers/config/jwt');


router.post('/login', AuthController.logIn);
router.post('/signup', AuthController.signUp);
router.get('/active/:active', AuthController.activeAccount);
router.get('/logout', authMiddleWare.verify, AuthController.logOut);


module.exports = router;
