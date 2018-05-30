import { Router } from 'express';
import * as BookingController from '../controllers/booking.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');

// Get all booking of User
router.get('/', authMiddleWare.verify, BookingController.getBookings);

// Get one booking of User
router.get('/:bookingId', authMiddleWare.verify, BookingController.getBookingById);

// Create Booking
router.post('/', authMiddleWare.verify, BookingController.createBooking);

// Update Booking
router.put('/:bookingId', authMiddleWare.verify, BookingController.updateBooking);

// Callback Booking recievemoney from Stellar
router.post('/recieved', BookingController.receiveMoneyBooking);

export default router;
