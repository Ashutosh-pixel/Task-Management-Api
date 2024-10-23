const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    //works in both authentication
    displayname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        select: false
    },

    //only for google auth
    googleId: {
        type: String,
        sparse: true,
        unique: true
    }
})

const User = mongoose.model('User', userschema);

module.exports = User;