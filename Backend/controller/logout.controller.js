function Logout(req, res) {
    res.clearCookie('token');
    res.json({ message: "logged out!" })
}

module.exports = Logout;