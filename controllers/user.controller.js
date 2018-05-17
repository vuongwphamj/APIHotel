import User from '../models/user';
import JWT from './config/jwt';
const MY_SCECRET_KEY = require('./config/secretKey');
const bcrypt = require('bcrypt');
const saltRounds = require('./config/saltRounds');
// const jwt = require('jsonwebtoken');
const USER_CODE = require('./code/user');



module.exports = {
  getUser,
  updateUser,
  deleteUser
}

//Get one User
function  getUser(req, res, next) {
    // console.log(req.data.user);
    // console.log(req.verify._id);
    User.findOne({_id: req.verify._id, email:  req.verify.email})
    .exec((err, user) => {
      if (err || !user) {
        res.json(USER_CODE.GET_USER.FAIL.USER_NOTFOUND);
      } else if(user.email !== req.verify.email){
        res.json(USER_CODE.GET_USER.FAIL.AUTHOR);
      } else {
        USER_CODE.GET_USER.SUCCESS.data = user;
        res.json(USER_CODE.GET_USER.SUCCESS);
      }
    });
  }
//Update User
function updateUser(req, res, next) {
    let userUpdate = req.body;
    userUpdate.updateDate = new Date();
    if(userUpdate.password){
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(userUpdate.password, salt)
        .then(function(hash) {
            // Store hash in your password DB.
            userUpdate.password = hash;
            User.findOneAndUpdate({_id: req.params.userId, email: req.verify.user},{$set: userUpdate},{rawResult:true, new:true},function(err, user){
              if (err || !user) {
                res.json(USER_CODE.UPDATE_USER.FAIL.USER_EXIST);
              } else {
                res.json(user.value);
              }
            });
        })
      })
    } else {
      User.findOneAndUpdate({_id: req.params.userId, email: req.verify.user},{$set: userUpdate},{rawResult:true, new:true},function(err, user){
          if (err || !user) {
            res.json(USER_CODE.UPDATE_USER.FAIL.USER_NOTFOUND);
          } else {
            res.json(user.value);
          }
      });
    }
  }
//Delete User
function  deleteUser(req, res, next){
    User.findOne({ _id: req.params.userId })
    .exec((err, user) => {
      if (err || !user) {
        res.json(USER_CODE.DELETE_USER.FAIL.USER_NOTFOUND);
      }  else if(user.email !== req.verify.user){
        res.json(USER_CODE.DELETE_USER.FAIL.AUTHOR);
      } else {
        user.remove(() => {
          res.send(USER_CODE.DELETE_USER.SUCCESS);
        });
      }
    });
  }
