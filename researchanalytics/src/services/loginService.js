import axios from "axios"
var message=undefined;
export function loginValidate(userName,password){
    let user = {"email":userName,"password":password}
    axios.post('http://127.0.0.1:5000/verify',user).then((res)=>{
        if(res.data.status===200){
            message = res.data.message
        }
    })
    return message
 
}


