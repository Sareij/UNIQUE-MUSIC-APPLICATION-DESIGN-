import React, { useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({children}) => {

    //authuser is correct means my user is loggedin -authuser -my user is present 
    let {authUser}= useContext(AuthContextAPI); 
     
    if(authUser == null){  //my user is loggedout -access to login,register,reset-password not access to any other like userprofile
        return <>{children}</>  //children-register , login, reset-password
    }
    else{
        return <Navigate to={"/user-profile"}/>
    }

}

export default PublicRoutes