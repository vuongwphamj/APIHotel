import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');


// Get one User by userId
router.get('/', authMiddleWare.verify, UserController.getUser);

// Update User
router.put('/:userId', authMiddleWare.verify, UserController.updateUser);

// Delete a User by userId
router.delete('/:userId', authMiddleWare.verify, UserController.deleteUser);

module.exports = router;
