import { useState } from "react";
import AuthorsForm from "./authorsComponent/AuthorForm";
import AuthorsList from "./authorsComponent/AuthorsList";
import AuthorsData from './authorsData';

export default function AuthorsPage(){
	let [authorsList,setAuthorsList] = useState(AuthorsData)

    function onAddAuthor(e){
        let newAuthor = {
            author_id:Math.floor(Math.random() * 100),
            first_name:e.target.first_name.value,
            last_name:e.target.last_name.value,
            email:e.target.email.value,
            phone:e.target.phone.value
        }

        setAuthorsList([...authorsList,newAuthor])
        console.log(authorsList)
    }

    return (
        <div className="mx-5 mt-2">
            <AuthorsForm  />
            <div className="ui horizontal divider">Author List</div>
            <AuthorsList />
        </div>
    );
}