const express = require('express');
const Users = require('../controllers/users.controllers')
const {validationResult} = require("../middleware/validationUser");
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/http.Status.Text')
const diskStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        const ex = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ex}`
        cb(null,fileName)
    }
})
const fileFilter = (req,file,cb)=>{
    const imageType = file.mimetype.split('/')[0];
    if(imageType == 'image'){
        return cb(null,true)
    }
    else{
        return cb(appError.create('file must be a image',400),false)

    }
}
const upload = multer({storage : diskStorage,fileFilter})
const UC = new Users();
const router = express.Router();
router.route('/').get(verifyToken,UC.GetAllusers)
router.route('/register').post(upload.single('avatar'),validationResult(),UC.Register)
router.route('/login').post(UC.Login)
module.exports= router;