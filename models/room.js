'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = new Schema({
  // roomId: { type: String, required: true },
  introduction: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  images: { type: String },
  beds: { type: Number, default: 1},
  description: String,
  price: { type: Number, default: "100000"},
  reservationStatus : {
    type : Number,
    enum : [1, 2, 3], // Booked , Free
    default : 2
  },
  status : {
    type : Number,
    enum : [1, 2, 3], // nomal,close,delete
    default : 1
  },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' , required: true},
});

module.exports = mongoose.model('Room', Room);
