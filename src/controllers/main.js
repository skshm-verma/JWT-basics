const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/index');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const id = new Date().getDate();  //just for demo purposes, getDate() gives you today's day

    //try to keep payload small, better experience for user
    const token = jwt.sign({ id, username }, process.env.JWT_SECERT, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 1000);

    res.status(200).json({
        msg: `Hello ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    })
}

module.exports = { login, dashboard }