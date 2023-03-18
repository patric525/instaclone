import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const getlog = async()=>{
        try {
            localStorage.removeItem('token')
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getlog()
    })
  return (
    <div>
      
    </div>
  )
}

export default Logout
