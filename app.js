const express = require("express");
require('dotenv').config()
const httpStatusText = require('./utils/http.Status.Text')
const cors = require('cors');
const app = new express();
const path = require('node:path')
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongo server started");
    
})

const CourseRoutes = require("./routes/Courses.Route");
const usersRoute = require('./routes/Users.Route')
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/courses',cors(),CourseRoutes)
app.use('/api/users',usersRoute)

app.all("*",(req,res,next)=>{
    res.status(404).json({status:httpStatusText.ERROR,message :"this resource is not avialable"})
})
app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({status: err.statusMessage || httpStatusText.ERROR , code : err.statusCode || 404 ,data:null,mesage:err.message})
})
app.listen(process.env.PORT || 2001,()=>{
    console.log("server start of port 2000")
})