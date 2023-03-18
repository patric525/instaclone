import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {Link} from 'react-router-dom'


const Navbar = () => {
    const [dis, setDis] = useState('none')
    const show = () => {
        if (dis === 'none') {
            setDis('block')
        }
        else {
            setDis('none')
        }
    }
    return (
        <div className='navbar'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="error" />
            <div className='iconslist'>
                <ul>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{marginTop:'-21rem' , marginLeft:'-2rem'}}>
                        <HomeIcon sx={{ height: '2.5rem', width: '2.5rem' }} />
                        </div>
                        <Link style={{ marginLeft: '0.2rem' , cursor:'pointer', textDecoration:'none', color:'black', marginTop:'-21rem'}} to='/'>
                            Home
                        </Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.1rem' }}>
                        <div style={{marginTop:'-16rem' , marginLeft:'-2rem'}}>
                        <Avatar
                            alt=""
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: '2.1rem', height: '2.2rem' }}
                        />
                        </div>
                        <Link style={{ marginLeft: '0.4rem' , cursor:'pointer', textDecoration:'none', color:'black', marginTop:'-16rem' }} to='/profile'>
                            Profile
                        </Link>
                    </div>
                </ul>
            </div>
            {/* <div className='dropdown'>
                <div style={{marginTop:'-11rem', marginLeft:'-13.5rem'}}>
                <DensitySmallIcon />
                </div>
                <p onClick={show} style={{marginTop:'-11rem'}}>More</p>
            </div> */}
            <ul style={{ display: 'block', listStyle: 'none' , marginTop:'-28.5rem', marginLeft:'1.5rem', height:'8rem'}} className='list'>
                <Link style={{cursor:'pointer', textDecoration:'none', color:'black'}} to='/logout'>Logout</Link>
                <div style={{ display: 'flex' }}>
                    <Link style={{marginRight:'-8.9rem' , cursor:'pointer', textDecoration:'none', color:'black'}} to='/problem'>Report a problem  </Link>
                    <ContactSupportIcon sx={{}} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Link style={{marginRight:'0.1rem' ,  cursor:'pointer', textDecoration:'none', color:'black', marginBottom:'0.4rem'}} to='/save'>Saved </Link>
                    <BookmarkBorderIcon />
                </div>
            </ul>
        </div>
    )
}

export default Navbar
