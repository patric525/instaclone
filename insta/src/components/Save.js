import React, { useEffect, useState } from 'react'
import Card2 from './Card2'

const Save = () => {
    const[save , setSave]=useState([])
    const getdata = async () => {
        try {
            const data = await fetch('http://localhost:5000/getsavepost', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
              
            })
            const res = await data.json()
            if (res) {
                console.log(res);
                setSave(res)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <div>
          {save.map((val)=>{
            return(
                <Card2
                capt={val.cap}
                imag={val.img}
                userp={val.upic}
                usern={val.uname}
                pname={val.name}
                />
            )
          })}
        </div>
    )
}

export default Save
