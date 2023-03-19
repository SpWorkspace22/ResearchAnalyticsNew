import Author from "./Author";
import "./Author.css"
import axios from 'axios'

import React, { useEffect, useState } from 'react';

export default function AuthorsList({onEditPopulateForm})
    {
    const [email,setEmail] = useState("");
    let [authors,setAuthors] = useState([]);
    
    // Refresh List
    function onLoadData(){
        axios.get('http://127.0.0.1:5000/authors')
        .then(function (response) {
            // handle success
            console.log(response)
            setAuthors([...response.data])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    function findByEmail(userEmail){
        axios.get('http://127.0.0.1:5000/author',{ params: { email: userEmail } })
        .then(function (response) {
            // handle success
            console.log(response)
            setAuthors([...response.data])
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }
    //filter user on current list
    function onSearchClick(e){
        if(email===""){
            onLoadData();
        }else{
            findByEmail(email)
        }  
    }

    function onEditClick(author){
        onEditPopulateForm(author)
    }

    function onRemoveAuthor(author_id){
        axios.delete('http://127.0.0.1:5000/authors/remove',
        { params: { author_id: author_id } })
        .then(function (response) {
            // handle success
            onLoadData();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    return (
        <>
            <div className="ui form small mb-1">
                <div className="field">
                    <label>Email</label>
                    <div className="three fields">
                        <div className="field">
                            <input type="email" name="searchEmail" placeholder="a@gmail.com"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="field">
                            <button type="button" className="ui primary button"
                            onClick={onSearchClick}>Search</button>
                        </div> 
                        <div className="field">
                            <button type="button" onClick={onLoadData}
                            className="ui right floated circular icon button">
                                <i className="sync alternate icon"></i>
                            </button>
                        </div>                         
                    </div>
                </div>
            </div>
            <table className="ui single selectable green line table attached small mt-3">
            <thead>
                <tr>
                    <th>AuthorId</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
				{
                    authors.map((a)=> 
                        <Author key={a.author_id} author={a} 
                        onEditClick={onEditClick} onDeleteClick={onRemoveAuthor}/>
                    )}
            </tbody>
            </table>
        </>
    )
}