import { Router } from 'express';
import * as HotelController from '../controllers/hotel.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');

// upload model
// router.post('/upload', authMiddleWare.verify, Model3dController.uploadModel);

// get 1 Hotel
router.get('/:hotelId', HotelController.getHotelById);

// get multi Hotel
router.get('/', HotelController.getHotels);

// create Hotel, authen
router.post('/', authMiddleWare.verify, HotelController.createHotel);

// update Hotel, authen
router.put('/:hotelId', authMiddleWare.verify, HotelController.updateHotel);

// delete Hotel, authen
router.delete('/:hotelId', authMiddleWare.verify, HotelController.deleteHotel);


export default router;
