const express = require('express')
const User = require("../models/userModel")

const routers = express.Router()

const {signUp} = require('../controllers/userController')

routers.post('/', signUp)

module.exports  = routers;

