'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rating = new Schema({
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
//   note: { type: String, default: "no note" },
//   status : {
//     type : Number,
//     enum: [1, 2, 3],//waiting, success, fail
//     default: 1
//   },
//   roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
  ratingNumber: { type : Number, enum: [1, 2, 3, 4, 5] , require: true}//waiting, success, fail
}).index({ userId: 1, hotelId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', Rating);