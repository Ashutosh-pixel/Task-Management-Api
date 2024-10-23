const cookieParser = require('cookie-parser');
const express = require('express');
const dbConnect = require('./config/database');
const dotenv = require('dotenv');
const User = require('./model/user.model');
const authroute = require('./route/auth.route');
const passport = require('./utils/passport-config');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());



app.use('/api/auth', authroute);

app.get("/home", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // If user is not found, it means the token is invalid
            return res.status(401).json({ message: "Error in the token" });
        }
        req.user = user;
        console.log(user);
        next();
    })(req, res, next);
  },
  (req, res) => {
    res.send("Welcome to the home page!"); 
  }
);

app.get('/auth/google', (req, res, next) => {
    console.log("redirect to Google Auth");
    next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', passport.authenticate('google', { session: false }),
    (req, res) => {
        if (!req.user) {
            console.log('problem with google auth');
            res.redirect('/api/auth/login');
        }

        const token = jwt.sign(
            {
                id: req.user._id,
                displayname: req.user.displayname
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        })

        res.redirect('/home');
    }
)

app.listen(PORT, () => {
    console.log('server started😂😂')
    dbConnect();
})