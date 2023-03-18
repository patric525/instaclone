const express = require('express')
const router = express.Router()
const post = require('../models/postschema')
const usercomment = require('../models/comment')
const fetchuser = require('../middleware/fetchuser')
const comment = require('../models/comment')
const savepost = require('../models/saved')

//create a new post
router.post('/createpost', async(req,res)=>{
    try {
        const{userid, profilepic , caption  ,name , userpic}=req.body
        if(!userid || !profilepic || !caption || !name || !userpic){
            return res.json({message:'plz fill the fields properly'})
        }
        else{
            const firstpost = new post({userid:userid,postpic:profilepic , caption:caption ,name:name, userpic:userpic})
            const savepost = await firstpost.save()
            console.log(savepost);
            if(savepost){
                return res.json({message:'post added successfully'})
            }
        }
    } catch (error) {
        console.log('internal server ');
    }
})
//delete post
router.post('/deletepost' , async(req,res)=>{
    try {
        const{pid}=req.body
        const deletepost = await post.findByIdAndDelete({_id:pid})
        console.log(deletepost);
        if(deletepost){
            return res.json({message:'post deleted successfully'})
        }
    } catch (error) {
        console.log('internal server error');
    }
})

//fetch post
router.post('/getpost' , fetchuser, async(req,res)=>{
    try {
        const fetchpost = await post.find()
        if(fetchpost){
            return res.json(fetchpost)
        }
    } catch (error) {
        console.log(error);
    }
})
//add a comment
router.post('/comment' , async(req,res)=>{
    try {
        const{pid , comment, name}=req.body
        if(!pid || !comment || !name){
            return res.json({message:'plz fill the fields properly'})
        }
        else{
            const newcomment = new usercomment({pid:pid , comment:comment , name:name})
            const savecomment = await newcomment.save()
            if(savecomment){
                return res.json({message:'commented successfully'})
            }
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//get comment
router.post('/getcomment' , async(req,res)=>{
    try {
        const{pid}= req.body
        const fetchcommment = await comment.find({pid:pid})
        if(fetchcommment){
            return res.json(fetchcommment)
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//savepost
router.post('/savepost' , async(req,res)=>{
    try {
        const{cap,img,upic,uname,name}=req.body
        const spost = new savepost({cap:cap,img:img,upic:upic,uname:uname,name:name})
        const npost = await spost.save()
        if(npost){
            return res.json({message:'post saved'})
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//getsavepost
router.get('/getsavepost' , async(req,res)=>{
    try {
        const getsavepost = await savepost.find()
        if(getsavepost){
            return res.json(getsavepost)
        }
    } catch (error) {
        console.log('internal server error');
    }
})
//getpostdata
router.post('/getpostdata' , async(req,res)=>{
    try {
        const{uid}=req.body
        const ownpost = await post.find({userid:uid})
        if(ownpost){
            return res.json(ownpost)
        }
    } catch (error) {
        console.log('internal server error');
    }
})
module.exports=router
