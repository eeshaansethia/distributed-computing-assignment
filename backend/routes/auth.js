const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const validator = require('validator');
const sanitize = require('mongo-sanitize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({ status: 410, message: 'All fields are required!' });
    }
    if (!validator.isEmail(email)) {
        return res.json({ status: 410, message: 'Invalid email!' });
    }
    // check if user already exists
    let userCheck = await User.findOne({ email, username });
    if (userCheck) {
        return res.json({ status: 410, message: 'User already exists!' });
    }
    let pass = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        password: pass
    });
    await user.save().then(() => {
        return res.json({ status: 200, message: 'User registered successfully!', token: getToken(email) });
    }).catch((err) => {
        return res.json({ status: 410, message: 'User already exists!' });
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: 410, message: 'All fields are required!' });
    }
    if (!validator.isEmail(email)) {
        return res.json({ status: 410, message: 'Invalid email!' });
    }
    await User.findOne({ email }).then(async (data) => {
        if (data) {
            let pass = await bcrypt.compare(password, data.password);
            if (pass) {
                return res.json({ status: 200, message: 'User logged in successfully!', token: getToken(email) });
            } else {
                return res.json({ status: 410, message: 'Invalid password!' });
            }
        } else {
            return res.json({ status: 410, message: "User doesn't exist!" });
        }
    });
});

const getToken = (email) => {
    return jwt.sign(email,
        '0ffa7a73482f48bc28cbce1338b54b',
    );
};

module.exports = router;