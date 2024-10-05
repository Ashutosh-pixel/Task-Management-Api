const passport = require('passport');
const User = require('../model/user.model');
const dotenv = require('dotenv');
dotenv.config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }

    return token;
}


const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
};


module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({ _id: jwt_payload.id });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false); // No user found
            }
        } catch (error) {
            return done(error, false); // Error during user lookup
        }
    }))
}

