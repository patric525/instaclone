import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

const Problem = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const token = localStorage.getItem('token')
    const [problem, setProblem] = useState('')
    const emailid = user.email
    const postdata = async () => {
        if(problem.length<10){
            window.alert('plz enter a valid caption')
            document.getElementById('prob').value=''
        }
        else{
            try {
                const data = await fetch('http://localhost:5000/problem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emailid, problem
                    })
                })
                const res = await data.json()
                if (res) {
                    console.log(res);
                    window.alert(res.message)
                }
                document.getElementById('prob').value=''
            } catch (error) {
                console.log(error);
            }
        }
       
    }
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
                }
            } catch (error) {
                console.log(error);
                navigate('/login')
            }
        }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <div style={{ position: 'absolute', top: '8rem', left: '33rem' }}>
            <form >
                <textarea name="" id="prob" cols="50" rows="10" value={problem} style={{ outline: 'none', fontSize: '1.2rem', paddingLeft: '0.2rem', paddingTop: '0.2rem' }} placeholder='Write your problem here...' onChange={(e) => setProblem(e.target.value)}></textarea>
                <div style={{ marginTop: '1rem' }}>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={postdata} >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Problem
