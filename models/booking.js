'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = new Schema({
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  note: { type: String, default: "no note" },
  status : {
    type : Number,
    enum: [1, 2, 3],//success, waiting, fail
    default: 2
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Booking', Booking);