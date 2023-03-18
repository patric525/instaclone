import React from 'react'

const Card2 = (props) => {
    return (
        <div class="card" >
            <div style={{display:'flex' , flexDirection:'row' , alignItems:'center', marginTop:'0.4rem' , marginLeft:'0.2rem'}}>
           <img src={props.userp} alt="" style={{height:'4rem' , width:'4rem' , borderRadius:'4rem', }} />
           <p style={{marginLeft:'0.2rem'}}>{props.usern}</p>
            </div>
           <img src={props.imag} alt="" style={{height:'28rem' , marginTop:'0.4rem'}}/>
           <p style={{marginLeft:'0.2rem'}}>{props.pname} : {props.capt}</p>
        </div>
    )
}

export default Card2
