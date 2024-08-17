const JWT = require('jsonwebtoken')
const User = require('../models/user')

module.exports = verifyToken = async (req, res, next) => {
    const token = await req.headers['authorization']
    if (!token) {
        return res.json({ status: 410, message: 'No token provided!' })
    }
    else {
        JWT.verify(token, '0ffa7a73482f48bc28cbce1338b54b', async (err, decoded) => {
            if (err) {
                console.log(err)
                return res.json({ status: 410, message: 'Invalid Token' })
            } else {
                await User.findOne({ email: decoded }).then((data) => {
                    if (data) {
                        req.user = data
                        next()
                    } else {
                        return res.json({ status: 410, message: "User doesn't exist!" })
                    }
                })
            }
        })
    }
}
