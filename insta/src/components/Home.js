import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './Card'

const Home = () => {
  const navigate = useNavigate('')
  const[post , setPost] = useState([])
  const token = localStorage.getItem('token')
  const getdata = async () => {
      try {
          const data = await fetch('http://localhost:5000/getpost', {
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
              setPost(res)
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
    <div>
     {
      post.map((val)=>{
        return(
          <Card
           caption={val.caption}
           name={val.name}
           image={val.postpic}
           pic={val.userpic}
           postid={val._id}
          />
        )
      })
     }
    </div>
  )
}

export default Home
