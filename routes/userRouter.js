const express = require('express')
const router = express.Router()

const {userSignup}=require('../controller/user-controller')

router.post('/signupPost',userSignup)
module.exports=router