const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    title :{
        type : String,
        require : true
    },
    price :{
        type : Number,
        require : true
    }
})
module.exports = mongoose.model("course",CourseSchema);