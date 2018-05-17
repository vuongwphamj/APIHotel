import { Router } from 'express';
import * as RoomController from '../controllers/room.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');


// get 1 Room
router.get('/one/:roomId', RoomController.getRoomById);

// get multi Room
router.get('/:hotelId', RoomController.getRooms);

// create Room, authen
router.post('/:hotelId', authMiddleWare.verify, RoomController.checkUserHotelAuth, RoomController.createRoom);

// update Room, authen
router.put('/:hotelId/:roomId', authMiddleWare.verify, RoomController.checkUserHotelAuth, RoomController.updateRoom)

// delete Room, authen
router.delete('/:hotelId/:roomId', authMiddleWare.verify, RoomController.checkUserHotelAuth, RoomController.deleteRoom)


export default router;
