function checkEntry(req, res, next) {
    const { username, fullname, password, confirmpassword } = req.body;

    if (username != '' && fullname != '' && password != '' && confirmpassword != '') {
        if (password === confirmpassword) {
            if (password.length >= 6 && confirmpassword.length >= 6) {
                next();
            }
            else {
                res.status(400).json({
                    message: "enter at least 6 digit password"
                })
            }
        }
        else {
            res.status(400).json({
                message: "password not match"
            })
        }
    }
    else {
        res.status(400).json({
            message: "require all fields"
        })
    }
}

module.exports = checkEntry;