import React from 'react';
import {Link} from 'react-router-dom'

export default function Navigation() {
    return (
        <div className='Nav'>
            <img src='CATtention-logo.png' alt='logo' className='logo'/>
            <Link to="/login" className='login-btn'>Login</Link>
        </div>
    )
}