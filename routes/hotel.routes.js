import { Router } from 'express';
import * as HotelController from '../controllers/hotel.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');

// upload model
// router.post('/upload', authMiddleWare.verify, Model3dController.uploadModel);

//initial data
router.get('/initial', HotelController.initialData);

// get 1 Hotel
router.get('/:hotelId', HotelController.getHotelById);

// get multi Hotel
router.get('/multi/:pageNumber', HotelController.getHotels);

// get all Hotel
router.get('/', HotelController.getAllHotels);

// post multi Hotel with Condition
router.post('/find', HotelController.getHotelsCondition);

// create Hotel, authen
router.post('/', authMiddleWare.verify, HotelController.createHotel);

// update Hotel, authen
router.put('/:hotelId', authMiddleWare.verify, HotelController.updateHotel);

// delete Hotel, authen
router.delete('/:hotelId', authMiddleWare.verify, HotelController.deleteHotel);


export default router;
