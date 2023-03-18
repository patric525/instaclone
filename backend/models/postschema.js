const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    userpic:{
        type:String,
        require:true
    },
    postpic:{
        type:String,
        require:true
    },
    caption:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    uploadedAt:{
       type:Date,
       default:Date.now()
    }
})

const post = mongoose.model('POST' , postSchema)
module.exports=post