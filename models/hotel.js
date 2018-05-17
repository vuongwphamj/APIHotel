'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hotel = new Schema({
  name: { type: String, required: true },
  introduction: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  logoImage: { type: String },
  coverImage: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: { type: String },
  status : {
    type : Number,
    enum: [1, 2, 3],
    default:1
  }
});

module.exports = mongoose.model('Hotel', Hotel);