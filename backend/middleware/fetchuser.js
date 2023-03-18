const jwt = require('jsonwebtoken')
const user = require('../models/userschema')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})


const fetchuser = async(req,res,next)=>{
    try {
        const token = req.header('token')
        const verifyuser = jwt.verify(token , process.env.KEY)
        const getuser = await user.findById({_id:verifyuser._id}) 
        req.user=getuser
        next()
    } catch (error) {
        console.log(error);
        res.send('unauthorized token')
        console.log('internal server error');
    }
}

module.exports=fetchuser