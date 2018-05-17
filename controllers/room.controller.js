const Room = require('../models/room');
const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
const ROOM_CODE = require('./code/room');
// var model3d = mongoose.model('model3d', model3dSchema);

module.exports = {
	checkUserHotelAuth,
    getRoomById,
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom
}

function getRoomById(req, res, next){
	// res.send(req.verify._id);
	// res.send("getRoomById")
	// Room
	// .findOne({_id: req.params.roomId})
	// .exec((err, room) => {
	// 	if(err || !Room){
	// 		return res.json(ROOM_CODE.getRoomById.FAIL);
	// 	}
	// 	ROOM_CODE.getRoomById.SUCCESS.Room = Room;
	// 	return res.json(ROOM_CODE.getRoomById.SUCCESS);
	// })
	Room
	.find({_id: req.params.roomId})
	.exec((err, room) => {
		if(err || !room){
			return res.json(ROOM_CODE.getRoomById.FAIL);
		}
		// console.log(room);
		ROOM_CODE.getRoomById.SUCCESS.room = room;
		return res.json(ROOM_CODE.getRoomById.SUCCESS);
	})

}

function getRooms(req, res, next){
	// res.send(req.verify._id);
	// res.send("getRooms")
	Room
	.find({hotelId: req.params.hotelId})
	.exec((err, room) => {
		if(err || !room){
			return res.json(ROOM_CODE.getRooms.FAIL);
		}
		console.log(room);
		ROOM_CODE.getRooms.SUCCESS.room = room;
		return res.json(ROOM_CODE.getRooms.SUCCESS);
	})
}

function checkUserHotelAuth(req, res, next){

	Hotel
	.findOne({_id: req.params.hotelId, admin: req.verify._id})
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(ROOM_CODE.checkUserHotelAuth.FAIL);
		}
		// ROOM_CODE.checkUserHotelAuth.SUCCESS.Room = Room;
		// return res.json(ROOM_CODE.checkUserHotelAuth.SUCCESS);
		return next();
	})
}

function createRoom(req, res, next){
	// res.send(req.verify._id);
	// res.send(req.body);
	let newRoom = req.body;
	newRoom.hotelId = req.params.hotelId;
	// req.verify._id;
	Room.create(newRoom, function(err, Room){
		if(err || !Room){
			// console.log(err);
			return res.json(ROOM_CODE.createRoom.FAIL);
		}
		ROOM_CODE.createRoom.SUCCESS.room = Room;
		return res.json(ROOM_CODE.createRoom.SUCCESS);
	})
}

function updateRoom(req, res, next){
	let newRoom = req.body;
	Room.findOneAndUpdate({_id: req.params.roomId, hotelId: req.params.hotelId},
		{$set: newRoom},
		{rawResult:true, new:true},
		function(err, room){
		if(err || !room.value){
			// console.log(err)
			return res.json(ROOM_CODE.updateRoom.FAIL);
		}
		ROOM_CODE.updateRoom.SUCCESS.room = room.value;
		return res.json(ROOM_CODE.updateRoom.SUCCESS);
	})
}

function deleteRoom(req, res, next){
	// res.send(req.verify._id);
	Room
	.findOne({_id: req.params.roomId, hotelId: req.params.hotelId})
	.exec((err, room) => {
		if(err || !room){
			return res.json(ROOM_CODE.deleteRoom.FAIL);
		}
		// ROOM_CODE.getRoomById.SUCCESS.Room = Room;
		room.remove(() => {
          return res.json(ROOM_CODE.deleteRoom.SUCCESS);
        });
		
	})
}