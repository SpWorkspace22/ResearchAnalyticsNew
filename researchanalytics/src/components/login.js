import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginValidate } from "../services/loginService";
import {useCookies}  from 'react-cookie';

export default function Login () {
    const [loginData,setLoginData] = useState({userName:"",password:""})
    const [error,setError] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn','user']);

    const navigate = useNavigate()

    function submitForm(e){ 
        e.preventDefault();
        let user = loginValidate(loginData.userName,loginData.password)
        if(user!==undefined){
            setCookie("isLoggedIn",true)
            setCookie("user",user)

            navigate("/")
        }else{
            setError("Invalid credential")
        }
    }

    function goToRegister(){
        navigate("/register")
    }
    
    return(
        <>
        <div class="ui segment centered mt-5 mx-5">
            <h1 className='display-4'>User Login</h1>
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
        </>
    );

}