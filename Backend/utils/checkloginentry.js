function checkLoginEntry(req, res, next) {
    const { username, password } = req.body;

    if (username !== '' && password !== '') {
        if (password.length < 6) {
            return res.status(400).json({
                message: "enter at least 6 digit password"
            })
        }
        else {
            next();
            console.log('first')
        }
    }
    else {
        return res.status(400).json({
            message: "empty fields"
        })
    }
}

module.exports = checkLoginEntry