const bcrypt = require("bcrypt");
const User = require("../model/user.model");

async function signup(req, res) {
    try {
        const { username, fullname, password, confirmpassword } = req.body;

        const resp = await User.findOne({ username: username });

        if (resp) {
            return res.status(400).json({
                message: "user exist try login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            fullname,
            password: hashedPassword
        })

        return res.status(200).json({
            message: "signup sucessfull",
            data: newUser
        })



    } catch (error) {
        return res.status(400).json({
            message: "error doing signup",
            error: error
        })
    }
}

module.exports = signup;