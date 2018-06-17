// const Room = require('../models/room');
const Booking = require('../models/booking');
const Room = require('../models/room');
const mongoose = require('mongoose');
const BOOKING_CODE = require('./code/booking');
// var model3d = mongoose.model('model3d', model3dSchema);

module.exports = {
    getBookingById,
    getBookings,
    createBooking,
    updateBooking,
	deleteBooking,
	receiveMoneyBooking
}

function getBookingById(req, res, next){
	Booking
    .find({_id: req.params.bookingId})
    .populate({path: 'roomId'})
	.exec((err, booking) => {
		if(err || !booking){
			return res.json(BOOKING_CODE.getBookingById.FAIL);
		}
		// console.log(room);
		BOOKING_CODE.getBookingById.SUCCESS.booking = booking;
		return res.json(BOOKING_CODE.getBookingById.SUCCESS);
	})

}

function getBookings(req, res, next){
	// res.send(req.verify._id);
	// res.send("getBookings")
	Booking
    .find({userId: req.verify._id})
    .populate({path: 'roomId'})
	.exec((err, booking) => {
		if(err || !booking){
			return res.json(BOOKING_CODE.getBookings.FAIL);
		}
		BOOKING_CODE.getBookings.SUCCESS.booking = booking;
		return res.json(BOOKING_CODE.getBookings.SUCCESS);
	})
}

//Create room -> status busy
function createBooking(req, res, next){
    // res.send(req.verify._id);

	let newBooking = req.body;
	newBooking.userId = req.verify._id;
	// req.verify._id;
	Booking.create(newBooking, function(err, booking){
		if(err || !booking){
			// console.log(err);
			// console.log(booking);
			return res.json(BOOKING_CODE.createBooking.FAIL);
		}
		Room.find({_id: booking.roomId},function(errRoom, room){
			if(errRoom){
				return res.json(BOOKING_CODE.createBooking.RoomErr);
			}
			if(!room){
				return res.json(BOOKING_CODE.createBooking.RoomNotFound);
			}
			room.map(item => {
				item.reservationStatus = 1;
				item.save();
			})
			BOOKING_CODE.createBooking.SUCCESS.bookingCode = booking._id;
			BOOKING_CODE.createBooking.SUCCESS.total = booking.total;
			return res.json(BOOKING_CODE.createBooking.SUCCESS);
		})
	})
}

function updateBooking(req, res, next){
	let newBooking = req.body;
	Booking.findOneAndUpdate({_id: req.params.bookingId, userId: req.verify._id},
		{$set: newBooking},
		{rawResult:true, new:true},
		function(err, booking){
		if(err || !booking.value){
			// console.log(err)
			return res.json(BOOKING_CODE.updateBooking.FAIL);
		}
		BOOKING_CODE.updateBooking.SUCCESS.booking = booking.value;
		return res.json(BOOKING_CODE.updateBooking.SUCCESS);
	})
}

function deleteBooking(req, res, next){
    res.send("Delete Booking");
	// res.send(req.verify._id);
	// Room
	// .findOne({_id: req.params.roomId, hotelId: req.params.hotelId})
	// .exec((err, room) => {
	// 	if(err || !room){
	// 		return res.json(BOOKING_CODE.deleteRoom.FAIL);
	// 	}
	// 	// BOOKING_CODE.getBookingById.SUCCESS.Room = Room;
	// 	room.remove(() => {
    //       return res.json(BOOKING_CODE.deleteRoom.SUCCESS);
    //     });
	// })
}

function receiveMoneyBooking(req, res, next){
	// console.log("receiveMoneyBooking Booking");
	// res.json("receiveMoneyBooking Booking");

	var payment = req.body;
	// console.log(payment);
	// let newBooking = req.body;
	Booking.findOne({ _id: payment.memo }, function(err, booking){
		if(err || !booking){
			// console.log(err)
			return res.status(500).end();
		}
		booking.total = booking.total - payment.amount;
		// console.log(booking.total);
		if(booking.total <= 0){
			booking.status = 2;
			if(booking.total < 0){
				booking.refund = 0 - booking.total;
				booking.total = 0;
			}
		}
		
		booking.save(function(errSave){
			if(errSave){
				return res.status(500).end();
			}
			return res.status(200).end();
		})
	})
}