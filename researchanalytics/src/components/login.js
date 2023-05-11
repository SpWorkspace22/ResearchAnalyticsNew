import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginValidate } from "../services/loginService";
export default function Login () {
    const [loginData,setLoginData] = useState({userName:"",password:""})
    const [error,setError] = useState("")

    const navigate = useNavigate()


    function submitForm(e){ 
        e.preventDefault();
        if(loginValidate(loginData.userName,loginData.password)){
            localStorage.setItem("status",true)
            localStorage.setItem("user",loginData.userName)
            navigate("/")
        }else{
            setError("Invalid credential")
        }
    }

    return(
        <>
        <div class="page-login mt-5">
            <div class="ui centered grid container">
                <div class="nine wide column">
                    { error.length > 0 ?
                        <div class="ui icon warning message">
                            <i class="lock icon"></i>
                            <div class="content">
                                <div class="header">
                                    Login failed!
                                </div>
                                <p>{loginData.error}</p>
                            </div>
                        </div>
                        :
                        <div></div>                    
                    }   
                    <div class="ui fluid card">
                        <div class="content">
                            <form class="ui form" onSubmit={(e)=>submitForm(e)} method="POST">
                                <div class="field">
                                    <label>User</label>
                                    <input type="text" name="user" value={loginData.userName} 
                                    placeholder="User"
                                    onChange={(e)=>{setLoginData({...loginData,userName:e.target.value})}}/>
                                </div>
                                <div class="field">
                                    <label>Password</label>
                                    <input type="password" name="pass" placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}}
                                    />
                                </div>
                                <button class="ui primary labeled icon button" type="submit">
                                    <i class="unlock alternate icon"></i>
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}