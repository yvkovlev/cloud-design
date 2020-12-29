// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const mongoose = require('mongoose');
// const User = require('../models/User');
//
// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'jseohfn'
// }
//
// module.exports = passport => {
//   passport.use(
//     new JwtStrategy(options, async (payload, done) => {
//       console.log('imbuli');
//       User.findOne({ email: "ale@gmail.com"}, (err, user) => {
//         if (err) {
//           console.log('nib')
//         } else {
//           console.log('not nib')
//         }
//       });
//       User.findOne({_id: payload.userId}, (err, user) => {
//         try {
//           if (user) {
//             done(null, user)
//           } else {
//             done(null, false)
//           }
//         } catch (e) {
//           console.log(e);
//         }
//       });
//     })
//   )
// }

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.send({
    "status": "401",
    "message": "access denied"
  });

  try {
    const verified = jwt.verify(JSON.parse(token), 'jseohfn');
    req.user = verified;
    next();
  } catch (err) {
    res.send({
      "status": "400",
      "message": "invalid token"
    })
  }
}
