const mongoose = require("mongoose");
const validator = require('validator');
const userRoles = require("../utils/userRoles");
const userShcema = new mongoose.Schema({
    firstname : {
        type:String,
        require : true
    },
    lastname : {
        type:String,
        require : true
    },
    email : {
        type:String,
        unique : true,
        require : true,
        validate : [validator.isEmail,'field should be a vailed email adress']
    },
    password :{
        type:String,
        require : true
    },
    token:{
        type:String
    },
    role:{
        type : String ,//Admin , User , Manager
        enum : [userRoles.USER,userRoles.ADMIN,userRoles.MANAGER],
        default : userRoles.USER
    },
    avatar :{
        type : String,
        default: 'uploads/logo.png'
    }

})
   
module.exports = mongoose.model('user',userShcema);