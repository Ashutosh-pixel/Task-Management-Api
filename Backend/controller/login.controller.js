const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

async function Login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).json({
                message: "invalid username"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: 'password is incorrect'
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        })

        return res.json({ message: "logged in successfully", token })

    } catch (error) {
        res.status(400).json({
            message: "error in login",
            error: error
        })
    }
}

module.exports = Login;