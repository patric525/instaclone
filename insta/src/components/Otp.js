import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Otp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const postdata = async (e) => {
        try {
            e.preventDefault()
            const data = await fetch('http://localhost:5000/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp
                })
            })
            const res = await data.json()
            if (res.message === 'email verified') {
                window.alert(res.message)
                navigate('/login')
            }
            else {
                window.alert(res.message)
                navigate('/otp')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div style={{ position: 'absolute', top: '4rem', left: '21rem', display: 'flex', marginLeft: '4rem', flexDirection: 'column' }} className='otp'>
            <h1>One-Time Password</h1>
            <form onSubmit={postdata}>
                <input type="text" maxLength='6' onChange={(e) => setOtp(e.target.value)} value={otp} />
                <input type="submit" value='Verify' className='submit' />
            </form>
        </div>
    )
}

export default Otp
