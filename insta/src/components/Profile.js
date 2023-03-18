import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import Addpost from './Addpost';
import Edit from './Edit';
import Card3 from './Card3';

const Profile = () => {
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const [dis, setDis] = useState('none')
    const [dis2, setDis2] = useState('none')
    const [dis3, setDis3] = useState('none')
    const [dis4, setDis4] = useState('none')
    const [user, setUser] = useState('')
    const [uid, setUid] = useState('')
    console.log(uid);
    const token = localStorage.getItem('token')
    const getdata = async () => {
        try {
            const data = await fetch('http://localhost:5000/getuser', {
                method: 'POST',
                headers: {
                    'token': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const res = await data.json()
            if (res) {
                console.log(res);
                setUser(res)
                setUid(res._id)
              
            }
        } catch (error) {
            console.log(error);
            navigate('/login')
        }
    }
    useEffect(() => {
       getdata()
    }, [])
    const openpost = () => {
        if (dis === 'none') {
            setDis('block')
            setDis2('block')
        }
        else {
            setDis('none')
        }
    }
    const closepic = () => {
        if (dis === 'block') {
            setDis('none')
            setDis2('none')
        }
    }
    const openid = () => {
        if (dis3 === 'none') {
            setDis3('block')
            setDis4('block')
        }
    }
    const closeid = () => {
        if (dis3 === 'block') {
            setDis3('none')
            setDis4('none')
        }
    }
    const getpostdata = async () => {
        try {
            const data = await fetch('http://localhost:5000/getpostdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid
                })
            })
            const res = await data.json()
            if (res) {
                console.log(res);
                setPost(res)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getpostdata()
    },[uid])
    return (
        <>
            <div style={{ position: 'absolute', top: '2rem', left: '24rem' }}>
                <Avatar
                    alt="Remy Sharp"
                    src={user.profilepic}
                    sx={{ width: 156, height: 156 }}
                />
            </div>
            <div>
                <p style={{ position: 'absolute', top: '2rem', left: '40rem', fontSize: '3rem', fontWeight: '200' }}>{user.username}</p>
                <p style={{ position: 'absolute', top: '6.4rem', left: '40.4rem', fontSize: '1.5rem', fontWeight: '200' }}>{user.bio}</p>
            </div>
            <p onClick={openpost} style={{ position: 'absolute', top: '4rem', left: '55rem' }} className='addpost'>Add post</p>
            <p onClick={openid} style={{ position: 'absolute', top: '8rem', left: '55rem', display:'none'}} className='addpost'>Update profile</p>
            <div style={{ position: 'absolute', top: '2rem', left: '76rem', display: dis2 }} onClick={closepic}>
                <CloseIcon />
            </div>
            <div style={{ position: 'absolute', top: '1rem', left: '71rem', display: dis4 }} onClick={closeid}>
                <CloseIcon />
            </div>
            <div style={{ position: 'absolute', top: '13rem', left: '19rem', backgroundColor: 'black', height: '0.2rem', width: '55rem' }} >

            </div>
            <div style={{ display: 'block', position: 'absolute', top: '2rem', left: '24rem' }}>
                <div style={{ display: dis, position: 'absolute', zIndex: '1' }}>
                    <Addpost
                        pic={user.profilepic}
                        username={user.username}
                        userid={user._id}
                    />
                </div>
            </div>
            <div style={{ display: dis3, position: 'absolute', zIndex: '1', top: '2rem', left: '23rem' }}>
                <Edit
                    pic={user.profilepic}
                    username={user.username}
                    userid={user._id}
                    emailid={user.email}
                    biop={user.bio}
                    pass={user.password}
                />
            </div>
            <div style={{ marginTop: '15rem', position: 'relative', zIndex: '0' }}>
                {
                    post.map((val) => {
                        return (
                            <Card3
                                pod={val.caption}
                                ouserpic={val.userpic}
                                oname={val.name}
                                opostpic={val.postpic}
                                oid={val._id}
                            />
                        )
                    })
                }
                </div>

            </>  
        
    )
}

export default Profile
