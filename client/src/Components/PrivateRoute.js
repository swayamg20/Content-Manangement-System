import React from 'react'
import {useAuth} from '../context/AuthContext';
import NotFound from './Error'
// import {Route } from 'react-router-dom'
export default function PrivateRoute({children}) {
  const {currentUser} = useAuth();
    return (
        currentUser ? children : <NotFound/>
  )
}
