let User = require('../modules/user.model');
const {validationResult} = require('express-validator')
const httpStatusText = require('../utils/http.Status.Text');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');
class Allusers{
    GetAllusers = asyncWrapper(async (req, res) => {
      
        const query = req.query;
    
        let page = query.page || 1;
        let limit = query.limit || 10;
        let skip = (page - 1) * limit;
    
        const users = await User.find({}, { __v: false,password:false })
          .limit(limit)
          .skip(skip);
        res.json({ status: httpStatusText.SUCESS, data: { users } });
    });
    Register = asyncWrapper(async(req,res,next)=>{
     const {firstname,lastname,email,password,role}=req.body;
     const avatar = req.file.filename;
      const error = validationResult(req);
      const checkemail = await User.findOne({email:email},{});
      if(checkemail){
        const err = appError.create('email already used',400,httpStatusText.FAIL);
       
        return next(err);
        
      }
      if(!error.isEmpty()){
        const errorob = appError.create(error.array(),400,httpStatusText.FAIL);
        return next(errorob);
      }
     const hashedPassword = await bcrypt.hash(password,10)
      const newUser = new User({firstname,lastname,email,password:hashedPassword,role,avatar});
      //generate  jwt token 
      const token =await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role})
      newUser.token=token
      
      await newUser.save();
      res.status(201).json({ status: httpStatusText.SUCESS, data: newUser });
    })
    Login = asyncWrapper(async (req, res,next) => {
      const {email,password}=req.body;
      if(!email || !password){
        const error = appError.create("email and password are required!",400,httpStatusText.FAIL);
        return next(error)
      }
      const user = await User.findOne({email:email}); 
      if(!user){
        const error = appError.create("user not found !",400,httpStatusText.FAIL);
        return next(error)
      }
      const matchedPassword = await bcrypt.compare(password,user.password);

      if(user && matchedPassword){
        const token = await generateJWT({email:user.email,id:user._id,role:user.role})
        
        res.status(200).json({status:httpStatusText.SUCESS,data:{token:token}})
      }
      else{
        const error = appError.create("something wrong !",500,httpStatusText.ERROR);
        return next(error)
      }

})
}
module.exports = Allusers;
