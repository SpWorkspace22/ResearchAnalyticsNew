import { useState, useEffect } from "react";
import AuthorsForm from "./authorsComponent/AuthorForm";
import AuthorsList from "./authorsComponent/AuthorsList";
import {useCookies}  from 'react-cookie';

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthorsPage(){
    const navigate =  useNavigate()
    const [cookies] = useCookies(["isLoggedIn"]);

    let [authorForm,setAuthorForm] = useState({
        author_id:"",
        first_name:"",
        last_name:"",
        depart_name:"",
        email:"",
        phone:"",
        platform_data:{
        GS:"",
        SC:""
    }
    })


    useEffect(()=>{
        if(cookies.isLoggedIn==='false'){
            navigate("/login")
        }
    },[])

    //Populate Form with author data
    function onPopulateFormData(author){
        setAuthorForm({...author})
    }

    function onSubmitAuthor(e){
        
        let author = {...authorForm,depart_name:e.target.depart.value,}
        console.log(author)
        axios.post('http://127.0.0.1:5000/authors', author)
        .then(function (response) {
            setAuthorForm({
                author_id:"",
                first_name:"",
                last_name:"",
                depart_name:"",
                email:"",
                phone:"",
                platform_data:{
                    GS:"",
                    SC:""
                }
            })
            alert(response.data.message)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className="mx-5 mt-2">
            <AuthorsForm  
                author={authorForm} 
                onSubmitAuthor={onSubmitAuthor} 
                setAuthorForm={setAuthorForm}/>
            <div className="ui horizontal divider">Author List</div>
            <AuthorsList onEditPopulateForm={onPopulateFormData} />
        </div>
    );
}