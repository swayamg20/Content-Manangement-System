import React from 'react'
import {Link} from 'react-router-dom'
export default function NotFound() {
  return (
    <div style={{marginTop:'15%'}}>
        404 Not Found!<br/>
        <Link to="/">Go to Login Page</Link>
    </div>
    
  )
}
