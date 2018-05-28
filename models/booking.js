'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = new Schema({
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  note: { type: String, default: "no note" },
  status : {
    type : Number,
    enum: [1, 2, 3],//waiting, success, fail
    default: 1
  },
  total: { type : Number, default: 0 },
  roomId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] ,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromDate: { type: Date, default: Date.now },
  toDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', Booking);


