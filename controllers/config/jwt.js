const AUTH_CODE = require('./../code/auth');
//jwt
const jwt = require('jsonwebtoken');
const MY_SCECRET_KEY = require('./secretKey');
//end jwt
const blackList = require('localStorage');

/* GET home page. */
module.exports = {
  createToken : (user) => {
  const token = jwt.sign({user}, MY_SCECRET_KEY, { expiresIn: '1800s' });
  return token;
  },
  verify : (req, res, next) => {
    let token = req.headers["authorization"];
    // console.log(token);
    let logout = blackList.getItem(token);

    if(token && logout!='logout'){
        jwt.verify(token, MY_SCECRET_KEY, function(err, data) {
          if (err) {
            // console.log(err);
            res.json(AUTH_CODE.UN_AUTH);
          } else {
            req.verify = data.user;
            // console.log(data.user);
            next();
          }
        })
    } else {
      res.json(AUTH_CODE.UN_AUTH);
    }
  },
}

