const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
const HOTEL_CODE = require('./code/hotel');
// var model3d = mongoose.model('model3d', model3dSchema);

module.exports = {
    getHotelById,
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel
}

function getHotelById(req, res, next){
	// res.send(req.verify._id);
	// res.send("getHotelById")
	Hotel
	.findOne({_id: req.params.hotelId})
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(HOTEL_CODE.getHotelById.FAIL);
		}
		HOTEL_CODE.getHotelById.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.getHotelById.SUCCESS);
	})

}

function getHotels(req, res, next){
	// res.send(req.verify._id);
	// res.send("getHotels")
	Hotel
	.find()
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(HOTEL_CODE.getHotels.FAIL);
		}
		console.log(hotel)
		HOTEL_CODE.getHotels.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.getHotels.SUCCESS);
	})
}

function createHotel(req, res, next){
	// res.send(req.verify._id);
	// res.send(req.body);
	let newHotel = req.body;
	newHotel.admin = req.verify._id;
	Hotel.create(newHotel, function(err, hotel){
		if(err || !hotel){
			return res.json(HOTEL_CODE.createHotel.FAIL);
		}
		HOTEL_CODE.createHotel.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.createHotel.SUCCESS);
	})
}

function updateHotel(req, res, next){
	// res.send(req.verify._id);
	// res.send("updateHotel")
	let newHotel = req.body;
	// newHotel.admin = req.body.admin || req.verify._id;
	Hotel.findOneAndUpdate({_id: req.params.hotelId, admin: req.verify._id},{$set: newHotel},{rawResult:true, new:true},function(err, hotel){
		if(err || !hotel.value){
			// console.log(err)
			return res.json(HOTEL_CODE.updateHotel.FAIL);
		}
		HOTEL_CODE.updateHotel.SUCCESS.hotel = hotel.value;
		return res.json(HOTEL_CODE.updateHotel.SUCCESS);
	})
}

function deleteHotel(req, res, next){
	// res.send(req.verify._id);
	Hotel
	.findOne({_id: req.params.hotelId, admin: req.verify._id})
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(HOTEL_CODE.deleteHotel.FAIL);
		}
		// HOTEL_CODE.getHotelById.SUCCESS.hotel = hotel;
		hotel.remove(() => {
          return res.json(HOTEL_CODE.deleteHotel.SUCCESS);
        });
		
	})
	// res.send("deleteHotel")
}