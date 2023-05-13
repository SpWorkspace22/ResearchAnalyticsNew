import { useState } from "react";
import "./css/register.css"

export default function Register(){
    const [userData,setUserData] =  useState({"user_name":"","email":"","password":"","cfrm_password":""})
    const [message,setMessage] = useState({error:"",success:""})

    function handleSubmit(e){
        e.preventDefault()
        if(!validatePassword()){
            setMessage({error:"Password Mismatch",success:""})
        }else{
            setMessage({error:"",success:"Registered"})
        }
    }

    function closeErr(){
        setMessage({error:"",success:""})
    }

    function validatePassword(){
        if(userData.password===userData.cfrm_password){
            return true
        }else{
            return false
        }
    }

    return(
        <div class="ui segment centered mt-5 mx-5">
            <h1 class="header">Register User</h1>
            {message.error.length>0 ? 
                <div class="ui negative message">
                   {message.error} <i class="close icon" onClick={closeErr}></i>
                </div> 
                :
                message.success.length > 0 ?
                <div class="ui success message">
                   {message.success} <i class="close icon" onClick={closeErr}></i>
                </div> :""
            }

            <form class="ui form" onSubmit={(e)=>handleSubmit(e)}>
                <div class="field">
                    <label>User Name</label>
                    <input type="text" placeholder="name" value={userData.user_name} 
                        onChange={(e)=>{ setUserData({...userData,user_name:e.target.value})}}
                        required
                    />
                </div>
                <div class="field">
                    <label>Email</label>
                    <input type="email" placeholder="abc@gmail.com" 
                        value={userData.email} 
                        onChange={(e)=>{setUserData({...userData,email:e.target.value})}}
                        required
                    />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password"  placeholder="password" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        value={userData.password} 
                        onChange={(e)=>{setUserData({...userData,password:e.target.value})}}
                        required
                    /> 
                    <div class="ui pointing red basic label">
                        <p>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</p>
                    </div>
                </div>
                <div class="field">
                    <label>Confirm Password</label>
                    <input type="password"  placeholder="password" 
                        value={userData.cfrm_password} 
                        onChange={(e)=>{setUserData({...userData,cfrm_password:e.target.value})}}
                        required
                    />
                    <div class="ui pointing red basic label">
                        <p>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</p>
                    </div>
                </div>
                <button class="ui teal button" type="submit">Submit</button>
            </form>
        </div>
    );
}