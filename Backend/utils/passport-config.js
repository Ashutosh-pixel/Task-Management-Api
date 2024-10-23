const passport = require('passport');
const User = require('../model/user.model');
const googleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

dotenv.config();


// Google OAuth Strategy
passport.use(new googleStrategy({
    clientID: process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existinguser = await User.findOne({ email: profile.emails[0].value })

            if (existinguser) {
                if (!User.googleId) {
                    existinguser.googleId = profile.id;
                    await existinguser.save(false);
                }

                console.log('user already exist', existinguser);
                return done(null, existinguser);
            }

            //create new user
            const newuser = await User.create({
                email: profile.emails[0].value,
                displayname: profile.displayName,
                googleId: profile.id
            })

            console.log('new user created', newuser);
            return done(null, newuser);

        } catch (error) {
            console.log('error in google strategy', error)
            return done(error, null);
        }
    }
))


// JWT Strategy
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





module.exports = passport;