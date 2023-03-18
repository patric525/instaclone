import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const Sign = () => {
  const navigate = useNavigate()
  const [profilepic, setProfilepic] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')
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
  const postdata = async (e) => {
    var special = 0
    var number = 0
    if (password.length < 10) {
      window.alert('password must be of 10 characters')
    }
    else if (password.includes('@')) {
      special = special + 1
    }
    else if (password.includes('#')) {
      special = special + 1
    }
    else if (password.includes('%')) {
      special = special + 1
    }
    else if (password.includes('$')) {
      special = special + 1
    }
    if(password.includes('1')){
      number= number = 1
    }
    else if(password.includes('2')){
      number = number +1
    }
    else if(password.includes('2')){
      number = number +1
    }
    else if(password.includes('3')){
      number = number +1
    }
    else if(password.includes('4')){
      number = number +1
    }
    else if(password.includes('5')){
      number = number +1
    }
    else if(password.includes('6')){
      number = number +1
    }
    else if(password.includes('7')){
      number = number +1
    }
    else if(password.includes('8')){
      number = number +1
    }
    else if(password.includes('9')){
      number = number +1
    }
    else if(password.includes('0')){
      number = number +1
    }
    if(number<=0){
      window.alert('password must contain digits')
    }
    else if (special <= 0) {
      window.alert('password must contain @ , $ , # , % at least one of these symbols')
    }
    else {
      try {
        e.preventDefault()
        const data = await fetch('http://localhost:5000/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            profilepic, username, email, bio, password
          })
        })
        const res = await data.json()
        if (res.message === 'check your email for verification') {
          window.alert(res.message)
          navigate('/otp')
          console.log(res);
        }
        else {
          window.alert(res.message)
          navigate('/sign')
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className='signbox'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="error" className='logo' />
      <p className='p'>Sign up to see photos and videos</p>
      <p className='p2'>of your friends</p>
      <div className='signup'>
        <form onSubmit={postdata}>
          <Button component="label">
            <Avatar
              alt=""
              src={profilepic}
              sx={{ height: '70px', width: '70px' }} className='avatar'
            />
            <input hidden accept="image/*" name='profilepic' type="file" onChange={handleimg} />
          </Button>
          <p style={{ marginLeft: '8.2rem' }}>Profile Pic</p>
          <div className='inputbox'>
            <input type="email" name='email' autoComplete='off' placeholder='Email' value={email} className='input' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name='username' placeholder='Username' value={username} className='input' autoComplete='off' onChange={(e) => setUsername(e.target.value)} />
            <input type="textarea" name='bio' placeholder='Bio' className='input' value={bio} maxLength='40' autoComplete='off' onChange={(e) => setBio(e.target.value)} />
            <input type="password" name='password' placeholder='Password' value={password} className='input' autoComplete='off' onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value='Create Account' className='submit' />
          </div>
        </form>
        <div className='downsignup'>
          <p>Have an account ?
            <Link to='/login' style={{ textDecoration: 'none', fontWeight: 'bolder', color: 'rgb(111, 158, 233', marginLeft: '0.2rem' }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sign
