const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    profilepic:{
       type:String,
       require:true
    },
    username:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    bio:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    otp:{
        type:Number
    },
    otpexpiry:{
        type:Date
    }

})

const user = mongoose.model('USER' , userSchema)
module.exports=user