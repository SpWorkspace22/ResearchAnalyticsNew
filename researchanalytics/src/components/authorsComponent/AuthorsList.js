import Author from "./Author";
import "./Author.css"
import axios from 'axios'

import React, { useEffect, useState } from 'react';

export default function AuthorsList({authorsCollection}){
    const [email,setEmail] = useState("");
    let [authors,setAuthors] = useState([]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/authors')
        .then(function (response) {
            // handle success
            setAuthors([...response.data])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    },[])

    function onLoadData(){
        axios.get('http://127.0.0.1:5000/authors')
        .then(function (response) {
            // handle success
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
    function onSearchClick(e){
        if(email===""){
            setAuthors([...authorsCollection]);
        }else{
            authors = authorsCollection.filter((a)=>{
                return a.email===email;
            })
            setAuthors(authors)
        }  
    }

    return  (
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
                                <i class="sync alternate icon"></i>
                            </button>
                        </div>                         
                    </div>
                </div>
            </div>
            <table className="ui single selectable green line table attached small mt-3">
            <thead>
                <tr>
                    <th>AuthorId</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                    <th>See More</th>
                </tr>
            </thead>
            <tbody>
				{
                    authors.map((a)=> 
                        <Author author={a} key={a.author_id}/>
                    )}
            </tbody>
            </table>
        </>
    )
}