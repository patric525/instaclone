const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    pid:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
})

const comment = mongoose.model('COMMENT' , commentSchema)
module.exports=comment