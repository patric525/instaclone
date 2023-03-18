const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const user = require('../models/userschema')
const sendmail = require('../utilities/email')
const problemp = require('../utilities/problem')
const fetchuser = require('../middleware/fetchuser')

dotenv.config({path:'./config.env'})

//creating a new user
router.post('/createuser', async (req, res) => {
    try {
        const { profilepic, username, email, bio, password } = req.body
        if (!profilepic || !username || !email || !bio || !password) {
            console.log(profilepic);
            console.log(username);
            console.log(email);
            console.log(bio);
            console.log(password);
            return res.json({ message: 'plz fill the fields properly' })
        }
        else {
            const finduseremail = await user.findOne({ email: email })
            if (finduseremail) {
                return res.json({ message: 'user with this email already exists' })
            }
            else {
                const findusername = await user.findOne({ username: username })
                if (findusername) {
                    return res.json({ message: 'username already exists' })
                }
                else {
                    const secpass = await bcrypt.hash(password, 10)
                    const otp = Math.floor(Math.random() * 1000000)
                    console.log(otp);
                    const otpp = otp.toString()
                    sendmail(email, 'Email verification', otpp)
                    const newuser = new user({ profilepic: profilepic, username: username, email: email, bio: bio, password: secpass, otp: otp, otpexpiry: new Date(Date.now() + 5 * 60 * 1000) })
                    const saveuser = await newuser.save()
                    if (saveuser) {
                        return res.json({ message: 'check your email for verification' })
                    }
                }
            }
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//otp verification
router.post('/otp', async (req, res) => {
    try {
        const { otp } = req.body
        if (!otp) {
            return res.json({ message: 'plz enter a otp' })
        }
        else {
            const findotp = await user.findOne({ otp: otp })
            if (findotp) {
                return res.json({ message: 'email verified' })
            }
            else {
                return res.json({ message: 'Otp invalid' })
            }
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ message: 'plzz fill the fields properly' })
        }
        else {
            const checkuser = await user.findOne({ email: email })
            if (checkuser) {
                const comparepassword = await bcrypt.compare(password, checkuser.password)
                if (comparepassword) {
                    const token = jwt.sign({ _id: checkuser._id }, process.env.KEY)
                    console.log(token);
                    return res.json({ message: 'logged in successful',authtoken :  token})
                }
                else {
                    return res.json({ message: 'invalid credentials' })
                }
            }
            else{
                return res.json({ message: 'invalid credentials' })
            }
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//get user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        return res.json(req.user)
    } catch (error) {
        console.log('internal server error');
    }
})
//report a problem
router.post('/problem', async(req,res)=>{
    try {
        const{emailid, problem}=req.body
        problemp(emailid , 'Report a problem' , problem )
        return res.json({message:'Problem reported'})
    } catch (error) {
        console.log('internal server error');
    }
})
//update user
router.patch('/edituser/id' , async(req,res)=>{
    try {
        const _id = req.params._id
        console.log(_id);
        const editu = user.findByIdAndUpdate({_id:_id}, req.body)
        if(editu){
            return res.json({message:'user updated'})
        }
    } catch (error) {
        console.log('internal server error');
    }
})

module.exports = router