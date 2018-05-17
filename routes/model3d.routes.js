import { Router } from 'express';
import * as Model3dController from '../controllers/model3d.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');

// upload model
router.post('/upload', authMiddleWare.verify, Model3dController.uploadModel);

// download model by id
router.get('/download/:fileId', authMiddleWare.verify, Model3dController.downloadModel);

// update model by id
router.post('/update/:fileId', authMiddleWare.verify, Model3dController.updateModel);

// delete model by id
router.delete('/delete/:fileId', authMiddleWare.verify, Model3dController.deleteModel);

//get all model3d of user
router.get('/viewmodel', authMiddleWare.verify, Model3dController.viewModel);


export default router;
