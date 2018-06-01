import User from '../models/user';
import JWT from './config/jwt';
const MY_SCECRET_KEY = require('./config/secretKey');
const bcrypt = require('bcrypt');
const saltRounds = require('./config/saltRounds');
const jwt = require('jsonwebtoken');
// const CODE = require('./../Code/code');
const AUTH_CODE = require('./code/auth');

const sendMail = require('./config/sendMail/sendMail');

const blackList = require('localStorage');


/*
* Active success redirect hasn't yet add link;
* redirect link success and link fail
*/

module.exports = {
    logIn,
    logOut,
    activeAccount,
    signUp
}
//Log In
/*
* http://localhost:8000/api/auth/login
* method: POST
* body: {
*   "email" : "vuongphamavocado@gmail.com",
*    "password" : "vuongphamvnm@gmail.com"
*  }
* result:  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidnVvbmdwaGFtdm5tQGdtYWlsLmNvbSIsImlhdCI6MTUyMzczMDg0NywiZXhwIjoxNTIzNzMyNjQ3fQ.p0BmTHNUP9XZFDqwCsRbtpC1NXZ2UndXUqOPr_Omvnk
*/
function  logIn(req, res, next){
    // console.log(req.body);
    if(req.body.password && req.body.email){
      const myPlaintextPassword = req.body.password;
      User.findOne({email: req.body.email})
      .exec((err, user) => {
        // console.log(user);

        if (err || !user ) {
          return res.json(AUTH_CODE.LOG_IN.FAIL.LOGIN_FAIL);
        }
        else if(!user.active){
            let token = JWT.createToken(user);
            // console.log(token);
            let title = 'Active Your Model3D Account!';
            let html = "<h1>Thank You for Using Our Service. </h1><p>Please Click the link bellow to active your Accout!</p>"
            + "<p><a href='http://localhost:8000/api/auth/active/"+token+"'>Active Model3D AR Account</a></p>";
            sendMail.send(user.email, title, html)
            .then(resMail => {
                return res.json(AUTH_CODE.LOG_IN.FAIL.SEND_MAIL_SUCCESS);
            }, err => {
                return res.json(AUTH_CODE.LOG_IN.FAIL.SEND_MAIL);
            })
            .catch(ex => {
              return res.json(AUTH_CODE.LOG_IN.FAIL.SEND_MAIL);
            })
        }
        else if(bcrypt.compareSync(myPlaintextPassword, user.password)){
          return res.json({
            token: JWT.createToken(user)
          });
        } else {
          return res.json(AUTH_CODE.LOG_IN.FAIL.LOGIN_FAIL);
        }
      });
    } else {
      res.json(AUTH_CODE.LOG_IN.FAIL.LOGIN_EMPTY);
    }
  }
//Log Out
/*
* http://localhost:8000/api/auth/logout
* method: GET
* Header: Authorization: token
* Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidnVvbmdwaGFtdm5tQGdtYWlsLmNvbSIsImlhdCI6MTUyMzczMDg0NywiZXhwIjoxNTIzNzMyNjQ3fQ.p0BmTHNUP9XZFDqwCsRbtpC1NXZ2UndXUqOPr_Omvnk
* Result:{
*    code: 200,
*    message: 'Log Out Success'
* }
*/
function  logOut(req, res, next){
    let token = req.headers["authorization"];
    // blackList.set( 'keyvuongpham', 'blacklist');
    if(token){
      blackList.setItem(token,'logout');
      setTimeout(function(){
        blackList.removeItem(token);
      }, 1800000);
      // console.log(blackList.get('keyvuongpham'));
      res.json(AUTH_CODE.LOG_OUT.SUCCESS);
    } else {
      res.json(AUTH_CODE.LOG_OUT.FAIL.NOT_AUTHOR);
    }
  }
//Active Account
/*
* http://localhost:8000/api/auth/active/:token
* method: GET
* Result:{
* }
*/
function  activeAccount (req, res, next){
    const token = req.params.active;
    jwt.verify(token, MY_SCECRET_KEY, function(err, data) {
      if (err) {
        // console.log(err);
        res.json(AUTH_CODE.ACTIVE_ACCOUNT.FAIL.TOKEN);
      } else {
        // console.log(data);
        // res.send(data.user);
        let newUser = data.user;
        User.findOneAndUpdate({email: newUser.email},{$set: {active: true}},{rawResult:true, new:true},function(err, user){
          if (err || !user ) {
            res.json(AUTH_CODE.ACTIVE_ACCOUNT.FAIL.UPDATE);
          } else {
            // redirect to Login Page
            res.redirect('http://localhost:8000/');
            // res.json(user.value);
          }
        });
      }
    })
  }
//Sign Up
/*
* http://localhost:8000/api/auth/signup
* method: POST
* body: {
*   "email" : "vuongphamavocado@gmail.com",
*   "password" : "vuongphamvnm@gmail.com",
*   "username" : "vuongphamvnm"
* }
* Result:{
*     code: 200,
*     message: 'Sign Up Success! Check email to active your account'
* }
*/
function signUp(req, res){
    // console.log(req.body);
    if(req.body.username && req.body.email && req.body.password){
      User.findOne({email: req.body.email})
      .exec((err, user) => {
        if(!user){
          let newUser = req.body;

          bcrypt.genSalt(saltRounds, function(err, salt) {
            // console.log(salt);
            bcrypt.hash(newUser.password, saltRounds)
            .then(function(hash) {
                  // Store hash in your password DB.
                newUser.password = hash;
                User.create(newUser, function(err, user){
                  if(!user || err){
                    // console.log('err ' + err);
                    // console.log('user ' + user);
                    res.json(AUTH_CODE.SIGN_UP.FAIL.CREATE);
                  } else {
                    let token = JWT.createToken(user);
                    // console.log(token);
                    let title = 'Active Your Model3D Account!';
                    let html = "<h1>Thank You for Using Our Service. </h1><p>Please Click the link bellow to active your Accout!</p>"
                    + "<p><a href='http://localhost:8000/api/auth/active/"+token+"'>Active Model3D AR Account</a></p>";
                    sendMail.send(user.email, title, html)
                    .then(resMail => {
                        res.json(AUTH_CODE.SIGN_UP.SUCCESS);
                    }, err => {
                        res.json(AUTH_CODE.SIGN_UP.FAIL.SEND_MAIL);
                    })
                    .catch(ex => {
                        res.json(AUTH_CODE.SIGN_UP.FAIL.SEND_MAIL);
                    })
                  }
                })
            })
          });

        } else {
          res.json(AUTH_CODE.SIGN_UP.FAIL.EXIST_ACCOUNT);
        }
      })
    } else {
      res.json(AUTH_CODE.SIGN_UP.FAIL.EMPTY);
    }
  }

