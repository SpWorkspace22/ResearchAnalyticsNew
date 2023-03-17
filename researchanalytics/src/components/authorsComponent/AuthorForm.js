import axios
 from "axios";
import { useEffect, useState } from "react";
export default function AuthorsForm({author,onSubmitAuthor,setAuthorForm}){
    let [user,setUser] = useState({...author})
    let [departments,setDepartments] = useState([])

    console.log(author)
    function onFormSubmit(e){
        e.preventDefault();
        onSubmitAuthor(e);
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/depart',)
        .then(function (response) {
            // handle success
            setDepartments([...response.data])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    },[])  

    useEffect(()=>{
        setUser({...author})
    },[author])


    return (
        <form className="ui small form p-2" onSubmit={onFormSubmit} method="POST">
            <h4 className="ui dividing header text-primary">Personal Information</h4>
            <div className="field">
                <div className="six fields">
                    <div className="field">
                        <label >Author Id</label>
                        <input type="text" name="author_id" 
                            onChange={(e)=>{
                                setAuthorForm(Object.assign(author, { author_id: e.target.value }))
                            }}
                            value={user.author_id} placeholder="" readOnly/>
                    </div>
                    <div className="field">
                        <label >First Name</label>
                        <input type="text" name="first_name" 
                           value={user.first_name} 
                           onChange={(e)=>{
                            setAuthorForm(Object.assign(user, { first_name: e.target.value }))
                            }}
                           placeholder="First Name" required/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" 
                            value={user.last_name} 
                            onChange={(e)=>{
                                setAuthorForm(Object.assign(user, { last_name: e.target.value }))
                            }}
                            placeholder="Last Name" required/>
                    </div>
                    <div className="field">
                        <label>Department</label>
                        <select className="ui fluid dropdown" name="depart" required>
                            {
                                departments.map((department)=>{
                                    return (
                                        <option 
                                            value={department.department_id} 
                                            selected={department.department_id===user.department_id?true:false}
                                        >
                                        {department.department_name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                   <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" 
                            onChange={(e)=>{
                                setAuthorForm(Object.assign(user, { email: e.target.value }))
                            }}
                            value={user.email} placeholder="abc@gmail.com" required/>
                    </div>
                    <div className="field">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" 
                        pattern="[0-9]{10}"
                        value={user.phone}
                        onChange={(e)=>{
                            setAuthorForm(Object.assign(user, { phone: e.target.value }))
                        }}
                        placeholder="Enter 10 Digit" />
                    </div>
                </div>
            </div>
            <h4 className="ui dividing header text-primary">Platform Details</h4>
            <div className="field">
                <div className="four fields">
                    <div className="field">
                        <label>Scopus Id</label>
                        <input type="text" name="scopusId"
                        value={user.platform_data.SC} 
                        onChange={(e)=>{
                            setAuthorForm({...user,platform_data:{...user.platform_data,SC:e.target.value}})
                            }
                        }
                        placeholder="1234"/>
                    </div>
                    <div className="field">
                        <label>Google Scholar Id</label>
                        <input type="text" name="scholarId" 
                        value={user.platform_data.GS} 
                        onChange={(e)=>{
                            setAuthorForm({...user,platform_data:{...user.platform_data,GS:e.target.value}})
                            }
                        }
                        placeholder="1234"/>
                    </div> 
                </div>
            </div>
            <input type="submit" className="ui primary button large"  value="Save" />
        </form>
    );
}