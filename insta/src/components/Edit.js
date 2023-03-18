import React, { useState , useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';


const Edit = (props) => {
    const[user,setUser]=useState('')
    const token = localStorage.getItem('token')
    const[profilepic , setProfilepic]=useState(user.profilepic)
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')
    // const [bio, setBio] = useState('')
    // const [password, setPassword] = useState('')
    const id = props.userid
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
      const onchange = (event) =>{
        setUser({...user,[event.target.name]:event.target.value})
      }
      const{email,username,bio,password}=user
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
    const postdata = async(e)=>{
        e.preventDefault()
        const data = await fetch(`http://localhost:5000/edituser/${id}` , {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                profilepic,username,email,bio,password
            })
        })
        const res = await data.json()
        if(res){
            console.log(res);
        }
    }

    return (
        <div style={{  backgroundColor: 'white' }} className='edit'>
            <form onSubmit={postdata}>
                <div style={{ marginLeft: '21rem', marginTop: '1rem' }}>
                    <Button component="label">
                        <Avatar
                            alt=""
                            src={profilepic}
                            sx={{ width: 96, height: 96 }}
                        />
                        <input hidden accept="image/*" multiple type="file" onChange={handleimg}/>
                    </Button>
                </div>
                <input type="email" className='input' name='email' value={user.email} onChange={onchange}/> <br />
                <input type="text" className='input' name='username' value={user.username} onConChange={onchange}/> <br />
                <input type="text" className='input' name='bio' value={user.bio}onChange={onchange}/> <br />
                <input type="password" className='input' name='password' value={user.password}  onConChange={onchange}/> <br />
                <input type="submit" value='update profile' />
            </form>
        </div>
    )
}

export default Edit
