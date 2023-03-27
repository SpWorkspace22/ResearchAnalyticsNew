import Author from "./Author";
import "./Author.css"
import axios from 'axios'

import React, { useEffect, useState } from 'react';

export default function AuthorsList({onEditPopulateForm})
    {
    const [searchCriteria,setSearchCriteria] = useState({email:"",department:""});
    let [authors,setAuthors] = useState([]);
	let [departments,setDepartments] = useState([])
    
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
	
    // Refresh List
    function onLoadData(){
        axios.get('http://127.0.0.1:5000/authors',
            { params: { email: searchCriteria.email,department:searchCriteria.department } })
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

    function findByCriteria(){
        axios.get('http://127.0.0.1:5000/author',
            { params: { email: searchCriteria.email,department:searchCriteria.department } })
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
        if(searchCriteria.email==="" && searchCriteria.department===""){
            onLoadData();
        }else{
            findByCriteria()
        }  
    }

    function onEditClick(author){
        onEditPopulateForm(author)
    }

    function onRemoveAuthor(author_id){
       let result = window.confirm("Are you sure, to delete author and related record")
            if(result){
            axios.delete('http://127.0.0.1:5000/authors/remove',
            { params: { author_id: author_id } })
            .then(function (response) {
                alert(response.data.message)
                onLoadData();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
    }

    return (
        <>
            <div className="ui form small mb-1">
                <div className="field">
                    <div className="four fields">
                        <div className="field">
						    <label>Email</label>
                            <input type="email" name="searchEmail" placeholder="a@gmail.com"
                            value={searchCriteria.email}
                            onChange={(e)=>{setSearchCriteria({...searchCriteria,email:e.target.value})}}/>
                        </div>
						<div className="field">
							<label>Department</label>
							<select className="ui fluid dropdown" name="depart" 
                                onChange={(e)=>{setSearchCriteria({...searchCriteria,department:e.target.value})}}>
							<option value="-1">Select Department</option>
                            {
                                departments.map((department)=>{
                                    return (
                                        <option 
                                            value={department.department_id} 
											selected={department.department_id===searchCriteria.department?true:false} >
											
                                        {department.department_name}
                                        </option>
                                    );
                                })
                            }
							</select>
						</div>
					</div>
					<div className="two fields">
					    <div className="field">
                            <button type="button" onClick={onSearchClick}
                            className="ui primary button">
                               Search
                            </button>
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
            <table className="ui single selectable green line table attached small mt-3" id="author">
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