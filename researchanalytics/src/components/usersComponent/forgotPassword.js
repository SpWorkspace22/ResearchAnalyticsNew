import { useState } from "react"
import { resetpassword } from "../../services/apiFile"
import axios from "axios"

export default function  ResetPassword(){
    const [userData,setUserData] =  useState({email:"",old_pass:"",new_password:"",cfrm_new_password:""})
    const [message,setMessage] = useState({error:"",success:""})

    function handleSubmit(e){
        e.preventDefault()
        if(!validatePassword(userData.old_pass)){
            setMessage({error:"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",success:""})
        }
        else if(!validatePassword(userData.new_password)){
            setMessage({error:"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",success:""})
        }else if(!validatePassword(userData.cfrm_new_password)){
            setMessage({error:"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",success:""})
        }
        else if(!validateCfrmPassword()){
            setMessage({error:"Password Mismatch",success:""})
        }else{
            resetPass()
        }
    }

    function validatePassword(password){
        if(password.match('/[a-z]/g')){
            return true
        }else if(password.match('/[A-Z]/g')){
            return true
        }else if(password.match('/[0-9]/g')){
            return true
        }else if(password.length>=8){
            return true
        }else{
            return false
        }
    }
    function closeErr(){
        setMessage({error:"",success:""})
    }

    function validateCfrmPassword(){
        if(userData.new_password===userData.cfrm_new_password){
            return true
        }else{
            return false
        }
    }

    function resetPass(){
        let user = {"email":userData.email,"old_pass":userData.old_pass,"new_pass":userData.new_password}
        axios.post(resetpassword,user).then((res)=>{
            if(res.data.status===200){
                setMessage({error:"",success:res.data.message})
                setUserData({email:"",old_pass:"",new_password:"",cfrm_new_password:""})
            }else if(res.data.status===404){
                setMessage({error:res.data.message,success:""})
            }
        })
    }

    return(
        <div className="container ">
            <div class="ui segment centered mt-5 mx-5" id="register_comp">
                <h1 class="header">Reset Password</h1>
                <div class="ui message">
                    <div class="header">
                    Instruction:
                    </div>
                    <ul class="list">
                        <li>Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</li>
                    </ul>
                </div>
                <hr />
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
                        <label>Email</label>
                        <input type="email" placeholder="abc@gmail.com" 
                            value={userData.email} 
                            onChange={(e)=>{setUserData({...userData,email:e.target.value})}}
                            required
                        />
                    </div>
                    <div class="field">
                        <label>Old Password</label>
                        <input type="password"  placeholder="password" 
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={userData.old_pass} 
                            onChange={(e)=>{setUserData({...userData,old_pass:e.target.value})}}
                            required
                        /> 
                    </div>
                    <div class="field">
                        <label>New Password</label>
                        <input type="password"  placeholder="password" 
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={userData.new_password} 
                            onChange={(e)=>{setUserData({...userData,new_password:e.target.value})}}
                            required
                        /> 
                    </div>
                    <div class="field">
                        <label>Confirm New Password</label>
                        <input type="password"  placeholder="password" 
                            value={userData.cfrm_new_password} 
                            onChange={(e)=>{setUserData({...userData,cfrm_new_password:e.target.value})}}
                            required
                        />
                    </div>
                    <button class="ui teal button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
