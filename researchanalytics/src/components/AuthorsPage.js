import { useState, useEffect } from "react";
import AuthorsForm from "./authorsComponent/AuthorForm";
import AuthorsList from "./authorsComponent/AuthorsList";
import AuthorsData from './authorsData';

import axios from "axios";

export default function AuthorsPage(){
    let [authorForm,setAuthorForm] = useState({
        author_id:"",
        first_name:"",
        last_name:"",
        email:"",
        phone:""
    })
    
    //Populate Form with author data
    function onPopulateFormData(author){
        setAuthorForm({...author})
    }

    function onSubmitAuthor(){
        console.log(authorForm)
        axios.post('http://127.0.0.1:5000/authors', authorForm)
        .then(function (response) {
            setAuthorForm({
                author_id:"",
                first_name:"",
                last_name:"",
                email:"",
                phone:""
            })
            console.log(response)
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