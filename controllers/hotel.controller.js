const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
const HOTEL_CODE = require('./code/hotel');
// var model3d = mongoose.model('model3d', model3dSchema);

module.exports = {
    getHotelById,
	getHotels,
	getHotelsCondition,
    createHotel,
    updateHotel,
	deleteHotel,
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
	let offset = (req.params.pageNumber - 1)*5;
	Hotel
	.find()
	.skip(offset).limit(5)
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(HOTEL_CODE.getHotels.FAIL);
		}
		HOTEL_CODE.getHotels.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.getHotels.SUCCESS);
	})
}

function getHotelsCondition(req, res, next){
	let hotelCondition = {};
	if(req.body.avgPrice){
		let avgPrice = req.body.avgPrice;
		hotelCondition.avgPrice = {$gt: 0, $lt: avgPrice + 9};
	}
	if(req.body.star){
		hotelCondition.star = req.body.star;
	}
	if(req.body.address){
		let address = req.body.address;
		hotelCondition.address = { '$regex' : address, '$options' : 'i' };
	}
	if(req.body.name){
		let name = req.body.name
		hotelCondition.name = { '$regex' : name, '$options' : 'i' };
	}
	Hotel.find( hotelCondition, function(err, hotel){
		if(err){
			return res.json(HOTEL_CODE.getHotelsCondition.FAIL);
		}
		if(!hotel){
			return res.json("Hotel not found!. No hotel is suitable for your favorite");
		}
		HOTEL_CODE.getHotelsCondition.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.getHotelsCondition.SUCCESS);
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
