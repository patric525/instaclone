import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iphone from './iphone.png'
import i25 from './i25.png'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const postdata = async (e) => {
    try {
      e.preventDefault()
      const data = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, password
        })
      })
      const res = await data.json()
      if (res.message === 'logged in successful') {
        window.alert(res.message)
        console.log(res.authtoken);
        localStorage.setItem('token', res.authtoken)
        navigate('/profile')
      }
      else{
        window.alert(res.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div style={{ position: 'absolute', top: '4rem', left: '21rem', display: 'flex', marginLeft: '4rem' }}>
      <div>
        <img src={iphone} alt="error" style={{ height: '30rem', borderRadius: '2rem', position: 'absolute', left: '10rem', top: '3rem' }} />
        <img src={i25} alt="error" style={{ height: '30rem', borderRadius: '2rem' }} />
      </div>
      <div className='loginbox'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="error" />
        <div style={{ marginTop: '1rem' }}>
          <form onSubmit={postdata}>
            <input type="email" name="email" autoComplete='off' id="" className='input'  placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="" className='input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Log In" className='submit' style={{ backgroundColor: '#3578E5', color: 'white', border: '0', outline: 'none' }} />
          </form>
        </div>
        <div className='downsign'>
          <p>Don't have an account ?
            <Link to='/sign' style={{ textDecoration: 'none', fontWeight: 'bolder', color: 'rgb(111, 158, 233', marginLeft: '0.2rem' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
