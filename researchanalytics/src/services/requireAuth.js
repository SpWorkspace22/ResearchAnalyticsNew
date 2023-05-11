import React, { Component, useEffect, useState, } from 'react';
import Login from '../components/login';
import { useSelector } from 'react-redux';


export default function RequireAuth(Component){
  const status = useSelector((state)=>state.login.loginStatus.loggedIn)
  const [isLoggedIn,setIsLoggedIn] = useState(status)

  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem("status"))
    console.log(isLoggedIn)
  },[status])

  if(isLoggedIn){
    console.log("logged in");
    return <Component />
  }else{
    console.log("logged out");
    return <Login />
  }
}