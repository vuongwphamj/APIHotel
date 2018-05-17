import { Router } from 'express';
import * as BookingController from '../controllers/booking.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');


// get 1 Room
// router.get('/one/:roomId', BookingController.getRoomById);

// // get multi Room
// router.get('/:hotelId', BookingController.getRooms);

// // create Room, authen
// router.post('/:hotelId', authMiddleWare.verify, BookingController.checkUserHotelAuth, BookingController.createRoom);

// // update Room, authen
// router.put('/:hotelId/:roomId', authMiddleWare.verify, BookingController.checkUserHotelAuth, BookingController.updateRoom)

// // delete Room, authen
// router.delete('/:hotelId/:roomId', authMiddleWare.verify, BookingController.checkUserHotelAuth, BookingController.deleteRoom)


export default router;
