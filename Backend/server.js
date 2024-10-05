const cookieParser = require('cookie-parser');
const express = require('express');
const dbConnect = require('./config/database');
const dotenv = require('dotenv');
const User = require('./model/user.model');
const authroute = require('./route/auth.route');
const passport = require('passport');
require('./utils/passport-config')(passport);

const app = express();
const PORT = 3000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get('/home', (req, res) => {
    res.send('welcome to home page!')
})

app.use('/api/auth', authroute);
app.get('/prot', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // If user is not found, it means the token is invalid
            return res.status(401).json({ message: "Error in the token" });
        }
        req.user = user;
        res.send('You have accessed a protected route!');
    })(req, res, next);
});

app.listen(PORT, () => {
    console.log('server started😂😂')
    dbConnect();
})