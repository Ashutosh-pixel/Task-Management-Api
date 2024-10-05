const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

//DataBase connection
async function dbConnect() {
    try {
        await mongoose.connect(`${process.env.DB_URI}/UsersData`)
            .then(() => console.log('database connected'));
    } catch (error) {
        console.log("Error in db connection in /config/database.js", error);
    }
}

module.exports = dbConnect;