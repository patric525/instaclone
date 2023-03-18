import React, { useState, useEffect } from 'react'
import StarRateIcon from '@mui/icons-material/StarRate';

const Card = (props) => {
  const pid = props.postid
  const [initial, setInitial] = useState('Show comments')
  const [dis, setDis] = useState('none')
  const [user, setUser] = useState('')
  const name = user.username
  const cap = props.caption
  const img = props.image
  const upic = props.pic
  const uname = props.name
  const token = localStorage.getItem('token')
  const [comment, setComment] = useState('')
  const [com, setCom] = useState([])
  const postdata = async (e) => {
    try {
      e.preventDefault()
      const data = await fetch('http://localhost:5000/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pid, comment, name
        })
      })
      const res = await data.json()
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
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
    }
  }
  useEffect(() => {
    getdata()
  }, [])
  const showcomment = async () => {
    if (initial === 'Show comments') {
      setInitial('Hide comments')
      setDis('block')
    }
    else {
      setInitial('Show comments')
      setDis('none')
    }
    try {
      const data = await fetch('http://localhost:5000/getcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pid
        })
      })
      const res = await data.json()
      if (res) {
        setCom(res)
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const savedata = async () => {
    try {
      const data = await fetch('http://localhost:5000/savepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cap, img, upic, uname,name
        })
      })
      const res = await data.json()
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.3rem', marginTop: '0.4rem' }}>
          <img src={props.pic} alt="" style={{ height: '3rem', width: '3rem' }} className='img' />
          <p style={{ marginLeft: '0.5rem' }}>{props.name}</p>
          <div style={{ marginLeft: '18rem' }}>
            <StarRateIcon onClick={savedata} />
          </div>
        </div>
        <img src={props.image} alt="" style={{ height: '30rem', width: '28rem', marginTop: '1rem' }} />
        <p style={{ marginLeft: '0.2rem' }}>{props.name} : {props.caption}</p>
        <p onClick={showcomment} style={{ marginLeft: '0.2rem', cursor: 'pointer' }}>{initial}</p>
        <div style={{ display: dis }}>
          {com.map((val) => {
            return (
              <p style={{ marginLeft: '0.2rem' }}>{val.name} : {val.comment}</p>
            )
          })}
        </div>
        <form onSubmit={postdata}>
          <div>
            <input type="text" name='comment' className='input' placeholder='Add a comment.....' style={{ paddingLeft: '0.1rem' }} onChange={(e) => setComment(e.target.value)} autoComplete='off' />
            <input type="submit" value='Comment' className='submit' />
          </div>
        </form>
      </div>
    </>
  )
}

export default Card
