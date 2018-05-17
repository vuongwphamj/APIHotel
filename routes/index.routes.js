const express = require('express');
const router = express.Router();
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import model3dRoutes from './model3d.routes';
import hotelRoutes from './hotel.routes';
import roomRoutes from './room.routes';
import bookingRoutes from './booking.routes';

//MongoDB config ==========================================================
const urlDb = 'mongodb://adminHotel:12345@localhost:27017/Hotel';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(urlDb, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  console.log("Connect to MongoDB success!!! Let's Start project");
});
//end MongoDB config ======================================================

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/model3d', model3dRoutes);
router.use('/hotel', hotelRoutes);
router.use('/room', roomRoutes);
router.use('/booking', bookingRoutes);

module.exports = router;