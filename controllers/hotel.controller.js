const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
const HOTEL_CODE = require('./code/hotel');

const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
// var model3d = mongoose.model('model3d', model3dSchema);

module.exports = {
	initialData,
    getHotelById,
	getHotels,
	getHotelsCondition,
	getAllHotels,
    createHotel,
    updateHotel,
	deleteHotel,
}

function initialData(req, res, next){
	let Input = 'Hotel.xls';
	let exceltojson;
	if(Input.split('.')[Input.split('.').length-1] === 'xlsx'){
		exceltojson = xlsxtojson;
	} else if(Input.split('.')[Input.split('.').length-1] === 'xls'){ 
		exceltojson = xlstojson;
	} else {
		return res.json("===== Javacript Choices Err ====== \n Err: input'extension is not correct");
	}
	try {
		exceltojson({
			input: Input, //the same path where we uploaded our file
			output: null, //since we don't need output.json
			lowerCaseHeaders: false
		}, function(err, result){
			if(err) {
					return res.json('===== Javacript Choice Err ====== \n Err: ' + err);
			}
			console.log("result : " + result.length)
			Hotel.create(result, function(err, hotel){
				if(err){
					console.log(err);
				}
				console.log("hotel : " + hotel.length)
				return res.json(hotel);
			})
			// result.map(item => {
				// let hotel = {
				// 	_id: item._id,
				// 	name: item.name,
				// 	introduction: item.introduction,
				// 	avgPrice: item.avgPrice,
				// 	star: item.star,
				// 	logoImage: item.logoImage,
				// 	coverImage: item.coverImage,
				// 	admin: item.admin,
				// 	address: item.address,
				// 	status: item.status,
				// 	ratingSum: item.ratingSum,
				// }
				// let hotelSave = new Hotel(hotel);
				// hotelSave.save();
			// })
		});
	} catch (e){
		return res.json('===== Javacript Choices Err ====== \n Err: Corupted excel file');
	}
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
	let pageNumber = req.params.pageNumber;
	if(!pageNumber){
		pageNumber = 1;
	}
	let offset = (pageNumber - 1)*10;
	Hotel
	.find()
	.skip(offset).limit(10)
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(HOTEL_CODE.getHotels.FAIL);
		}
		HOTEL_CODE.getHotels.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.getHotels.SUCCESS);
	})
}

function getAllHotels(req, res, next){
	Hotel
	.find()
	.exec((err, hotel) => {
		if(err || !hotel){
			return res.json(HOTEL_CODE.getAllHotels.FAIL);
		}
		HOTEL_CODE.getAllHotels.SUCCESS.hotel = hotel;
		return res.json(HOTEL_CODE.getAllHotels.SUCCESS);
	})
}

function getHotelsCondition(req, res, next){
	let hotelCondition = {};
	if(req.body.avgPrice){
		let avgPrice = req.body.avgPrice;
		hotelCondition.avgPrice = {$gt: avgPrice - 9, $lt: avgPrice + 9};
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
