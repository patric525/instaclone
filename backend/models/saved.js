const mongoose = require('mongoose')

const saveSchema = mongoose.Schema({
    cap:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    upic:{
        type:String,
        require:true
    },
    uname:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
})
const save = mongoose.model('SAVEPOST' , saveSchema)
module.exports=save