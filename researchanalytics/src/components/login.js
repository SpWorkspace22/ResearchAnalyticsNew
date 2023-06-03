import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies}  from 'react-cookie';
import axios from 'axios';

export default function Login () {
    const [loginData,setLoginData] = useState({userName:"",password:""})
    const [error,setError] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn','user']);

    const navigate = useNavigate()

    function submitForm(e){ 
        e.preventDefault();
        let user = {"email":loginData.userName,"password":loginData.password}
        axios.post('http://127.0.0.1:5000/verify',user).then((res)=>{
            if(res.data.status===200){
                setCookie("isLoggedIn",true)
                setCookie("user",res.data.message)
                navigate("/")
            }else{
                setError("Invalid credential")
            }
        })
    }

    function goToRegister(){
        navigate("/register")
    }
    
    return(
        <div className='container'>
        <div class="ui segment centered mt-5 mx-5">
            <h1 className='display-4'>User Login</h1>
            <hr />
            <div class="ui">
                {error.length>0 ? 
                    <div class="ui icon warning message">
                        <i class="lock icon"></i>
                        <div class="content">
                            <div class="header">
                                Login failed!
                            </div>
                            <p>You might have misspelled your username or password!</p>
                        </div>
                    </div>
                    :""
                }
                <div class="ui fluid">
                    <div class="content">
                        <form class="ui form" method="POST" onSubmit={(e)=>{submitForm(e)}}>
                            <div class="field">
                                <label>User</label>
                                <input type="text" name="user" placeholder="User" value={loginData.userName} required
                                                onChange={(e)=>{setLoginData({...loginData,userName:e.target.value})}}/>
                                </div>
                                <div class="field">
                                    <label>Password</label>
                                    <input type="password" name="pass" placeholder="Password"  value={loginData.password}
                                                onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}}
                                                required/>
                                </div>
                                <button class="ui primary labeled icon button" type="submit">
                                    <i class="unlock alternate icon"></i>
                                                Login
                                </button>
                                <button class="ui teal labeled icon button" onClick={goToRegister}>
                                    <i class="signup icon"></i>
                                                Register
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}