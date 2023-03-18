import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const Card3 = (props) => {
    const deletepost = async()=>{
        const pid = props.oid
        console.log(props.oid);
        const data = await fetch('http://localhost:5000/deletepost',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
               pid
            })
        })
        const res = await data.json()
        if(res){
            console.log(res);
            window.alert(res.message)
        }
    }
    return (
        <div class="card">
          <div style={{display:'flex' , alignItems:'center'}}>
            <img src={props.ouserpic} alt="" style={{height:'4rem' , width:'4rem', borderRadius:'2rem' , marginLeft:'0.2rem'}}/>
            <p style={{marginLeft:'0.2rem'}}>{props.oname}</p>
            <div style={{marginLeft:'16rem'}} onClick={deletepost}>
            <DeleteIcon/>
            </div>
          </div>
            <img src={props.opostpic} alt=""  style={{height:'26rem' , width:'27.8rem' , marginTop:'0.5rem'}}/>
            <p style={{marginTop:'0.2rem' , marginLeft:"0.4rem"}}>{props.oname} : {props.pod}</p>
      </div>
    )
}

export default Card3
