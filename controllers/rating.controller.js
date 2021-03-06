const Hotel = require('../models/hotel');
const Rating = require('../models/rating');
const mongoose = require('mongoose');
// const HOTEL_CODE = require('./code/hotel');
const _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;

const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
// var objectId = new ObjectID();

module.exports = {
	initialRating,
	getRecommendation,
	postRatingHotel
}

function initialRating(req, res, next){
	let Input = 'Rating.xlsx';
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
			Rating.create(result, function(err, rating){
				if(err){
					console.log(err);
				}
				console.log("Rating : " + rating.length)
				return res.json(rating);
			})
		});
	} catch (e){
		return res.json('===== Javacript Choices Err ====== \n Err: Corupted excel file');
	}
}

function postRatingHotel(req, res, next){
	let userId = req.verify._id;
	let ratingNumber = req.params.ratingNumber;
	Rating.findOne({hotelId: req.params.hotelId, userId: userId}, function(err, rating){
		if(err || !rating){
			let newRating = {
				userId: userId,
				hotelId: req.params.hotelId,
				ratingNumber: ratingNumber,
			}
			Rating.create(newRating, function(err, ratingCreate){
				if(err || !ratingCreate){
					return res.json("Rating Create Error");
				} else {
					Rating
					.find({hotelId: req.params.hotelId}, function(err, result){
						if(err || !result){
							res.json(err || result);
						}
						let sumRating = 0;
						result.map(item => {
							sumRating += item.ratingNumber;
						})
						let avg = sumRating/result.length;
						Hotel.findOne({_id: req.params.hotelId}, function(err, hotel){
							if(err || !hotel){
								return res.json(err);
							}
							hotel.ratingSum = avg.toFixed(2);
							// console.log(avg);
							hotel.save(function(err, hotelSave){
								return res.json(hotelSave);
							});

						})
					})
				}
			})
		} else {
			rating.ratingNumber = ratingNumber;
			rating.save(function (err, ratingSave) {
				if (err){
					return res.json(err);
				}
				Rating
				.find({hotelId: req.params.hotelId}, function(err, result){
					if(err){
						return res.json(err);
					}
					if(!result){
						return res.json("Rating with this hotel not found");
					}
					let sumRating = 0;
					result.map(item => {
						// console.log(item.ratingNumber);
						sumRating += item.ratingNumber;
					})
					let avg = sumRating/result.length;
					Hotel.findOne({_id: req.params.hotelId}, function(err, hotel){
						if(err){
							return res.json(err);
						}
						if(!hotel){
							return res.json("Hotel on this Id notfound");
						}
						hotel.ratingSum =  avg.toFixed(2);
						// console.log(avg);
						hotel.save(function(err, hotelSave){
							// console.log("vuongpham tesst: ");
							return res.json(hotelSave);
						});

					})
					
				})
			});
		}
	})
	// res.json(req.params);
}

function  getRecommendation(req, res, next){
	
    // res.send("getRecommendation ... " + req.params.userId);
	let user1 = req.verify._id;
	Rating
	.find({userId: { $ne: user1}})
	.distinct("userId")
	.exec(function(err, rating){
		if(err){
			return res.send("hotel err");
		}
		if(!rating){
			Hotel
			.find()
			.sort({"ratingSum":-1})
			.limit(5)
			.exec(function(err, hotels){
				if(err){
					return res.send("hotel err");
				}
				// console.log("No other User rating ");
				return res.json(hotels);
			})
		} else {
			let i=0;
			let arrayDif = [];
			let arrayDifAll = [];
			for(;i < rating.length; i++){
				let user2 = rating[i];
				distanceRecommendation(user1, user2, function(err, difRating){
					// if(err == 2 ){
					// 	Hotel
					// 	.find()
					// 	.sort({"ratingSum":-1})
					// 	.limit(5)
					// 	.exec(function(err, hotels){
					// 		if(err){
					// 			return res.send("hotel err");
					// 		}
					// 		console.log("User have 0 rating ");
					// 		return res.json(hotels);
					// 	})
					// }

					arrayDif.push(difRating);
					// console.log('test recommand: ', arrayDif);
					arrayDifAll = arrayDifAll.concat(difRating)
					if(arrayDif.length == rating.length){

						let arrTemplate = [];
						// sumSim, sumSimHotel
						arrayDifAll.reduce(function (resultArray, value) {
							if (!resultArray[value.hotelId]) {
								resultArray[value.hotelId] = {
									similarityHotel: 0,
									similarity: 0,
									hotelId: value.hotelId
								};
								arrTemplate.push(resultArray[value.hotelId])
							}
							resultArray[value.hotelId].similarityHotel += value.similarityHotel;
							resultArray[value.hotelId].similarity += value.similarity;
							return resultArray;
						}, {});

						// sumSimHotel/sumSim
						arrTemplate.map((item)=>{
							if(!item.result){
								item.result = 0;
							}
							item.result = item.similarityHotel/item.similarity;
						})

						// sort less -> great
						arrTemplate.sort(function (a, b) {
							if(a.result - b.result){
								return a.result - b.result;
							}
						})
						// sort Great -> Less;
						arrTemplate.reverse();
						// get 5 Greatest
						let arrTemplate1 = arrTemplate.slice(0, 5);
						// console.log(arrTemplate1);

						// List Hotel 
						let listHotel = [];
						arrTemplate1.map(item => {
							listHotel.push(item.hotelId);
						})
						Hotel.find({_id: { "$in" : listHotel}}, function(err, hotels){
							if(err){
								return res.send("hotel err");
							}
							// sorting Hotel Greate
							let resultSort = [];
							listHotel.forEach(function(key) {
								hotels.forEach(function(hotel){
									if( key.equals(hotel._id) ){
										resultSort.push(hotel);
									}
								})
							})
							return res.json(resultSort);
						})
						
					}
				})
			}
		}
	})
}

/* err , cb(err, userInfor, distance)
* 1. find recommend of User fail
* 2. userId: chưa recommend
* 3. 
*
*
*/
function distanceRecommendation( userId, otherUserId, cb){
	// Rating
	Rating
	.find({userId: userId}, (err, rating1) => {
		if(err){
			return cb(1, null);
		}
		if(!rating1){
			return cb(2, null);
		}
		Rating
		.find({userId: otherUserId}, (err, rating2) => {
			if(err){
				return cb(1, null);
			}
			if(!rating2){
				return cb(2, null);
			}
            let user2Rating = rating2.filter(item2 => {
				return rating1.filter(item1 => {
					return item2.hotelId.equals(item1.hotelId);
				}).length > 0
			})
            if(!user2Rating.length){
            	return cb(null, 0);
            } else {
				let pow = [];
                let user1Rating = rating1.filter(item1 => {
                    return user2Rating.filter(item2 => {
                        return item2.hotelId.equals(item1.hotelId)
                    }).length > 0
				})
				// sumOfSquare
				let sumOfSquare = 0;
				for(let i=0; i < user1Rating.length; i++){
					sumOfSquare = sumOfSquare + Math.pow(user1Rating[i].ratingNumber - user2Rating[i].ratingNumber, 2);
				}
				// similarity 
				let similarity = 1/(1+sumOfSquare);
				// diferent Hotel Rating
				let user2DifRating = rating2.filter(item2 => {
                    return rating1.filter(item1 => {
						return item2.hotelId.equals(item1.hotelId);
                    }).length == 0
				})
				// similarityHotel of one User: similarity*ratingNumber
				let difRating = [];
				user2DifRating.forEach(user2DifRatingItem => {
					difRating.push({
						ratingNumber: user2DifRatingItem.ratingNumber,
						similarityHotel: user2DifRatingItem.ratingNumber * similarity,
						userId: user2DifRatingItem.userId,
						hotelId: user2DifRatingItem.hotelId,
						similarity: similarity
					})
				})
                return cb(null, difRating);
            }
		})
	})
}

// function groupBy(objectArray, property) {
// 	return objectArray.reduce(function (acc, obj) {
// 	  var key = obj[property];
// 	  if (!acc[key]) {
// 		acc[key] = [];
// 	  }
// 	  acc[key].push(obj);
// 	  return acc;
// 	}, {});
// }