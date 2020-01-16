const keys = require("../Config/keys");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../Models/User");
const restaurant = require("../models/Restaurants");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
      restaurant
        .findById(jwt_payload.id)
        .then(restau => {
          if (restau) {
            return done(null, restau);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};