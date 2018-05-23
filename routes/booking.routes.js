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

// Get all booking of User
router.get('/', authMiddleWare.verify, BookingController.getBookings);

// Get one booking of User
router.get('/:bookingId', authMiddleWare.verify, BookingController.getBookingById);

// Create Booking
router.post('/', authMiddleWare.verify, BookingController.createBooking);

// Update Booking
router.put('/:bookingId', authMiddleWare.verify, BookingController.updateBooking);


export default router;
