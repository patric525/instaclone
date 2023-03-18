import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const Addpost = (props) => {
    const userpic = props.pic
    const userid = props.userid
    const name=props.username
    const [size, setSize] = useState('2rem')
    const [caption, setCaption] = useState('')
    const [profilepic, setProfilepic] = useState('')
    const handleimg = (e) => {
        const file = e.target.files[0]
        console.log(file);
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (reader.readyState === 2) {
                console.log(reader.result);
                setProfilepic(reader.result)
            }
        }
    }
    const captiontext = (e) => {
        setCaption(e.target.value)
        if (caption === '') {
            setSize('2rem')
        }
        else {
            setSize('1.4rem')
        }
    }
    console.log(userid);
    const postdata = async (e) => {
        if(caption.length<10){
            window.alert('please enter a valid caption')
        }
        else{
            try {
                e.preventDefault()
                const data = await fetch('http://localhost:5000/createpost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        userid,userpic,profilepic,caption,name
                    })
                })
                const res= await data.json()
                if(res){
                    window.alert(res.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <div className='post' style={{ backgroundColor: 'white', height: '35rem', width: '51rem' }}>
                <form onSubmit={postdata}>
                    <div>
                        <Button component="label">
                            <Avatar
                                alt="error"
                                src={profilepic}
                                sx={{ height: '550px', width: '370px' }} className='avatar'
                                variant='rounded'
                            />
                            <input hidden accept="image/*" name='profilepic' type="file" onChange={handleimg} id='profilepic'/>
                        </Button>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '1rem', left: '25rem' }}>
                            <Avatar
                                alt="error"
                                src={props.pic}
                                sx={{ width: 56, height: 56 }} className='avatar'
                            />
                            <p style={{ marginLeft: '0.6rem', fontWeight: 'bolder' }}>{props.username}</p>
                        </div>
                    </div>
                    <textarea name="caption" id="caption" cols="30" rows="10" value={caption} placeholder='Write a caption...' style={{ position: 'absolute', top: '6rem', left: '25rem', width: '25rem', fontSize: size }} className='textarea' onChange={captiontext} required>
                    </textarea>
                    <input type="submit" value='Share' className='submitpic' />
                </form>
                <div className='line'></div>
            </div>
        </>
    )
}

export default Addpost
