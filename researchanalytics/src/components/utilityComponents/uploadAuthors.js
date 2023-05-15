import { read, utils, writeFile } from 'xlsx';
import axios from 'axios';
import {useCookies}  from 'react-cookie';
import { useEffect, useState } from "react";
import AuthorCheck from "./authorCheck";
import UploadLog from "./uploadLog";
import { useNavigate } from 'react-router-dom';

export default function AuthorUpload(){
    const [authorsData,setAuthors] = useState({authors:[],error:""})
    const [response,setResponse] = useState([])
    const [cookies] = useCookies(["isLoggedIn"]);
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(cookies.isLoggedIn==='false' || cookies.isLoggedIn===undefined){
            navigate("/login")
        }
    },[])

    function handleImport(e){
        const files = e.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = read(e.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const header = utils.sheet_to_json(wb.Sheets[sheets[0]],{ header: 1 })[0];
                    if(!checkRequiredFields(header)){
                        setAuthors({...authorsData,error:"Required Fields Are Missing"})
                    }else{
                        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                        let authorsList = parseRows(rows);
                        setAuthors({authors:[...authorsList],error:""})
                        
                    }
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    function parseRows(rows){
        let authorsList = []

        rows.forEach(row => {
            //console.log(row)
            let author = {}
            author["first_name"]=row["first_name"]
            author["last_name"]=row["last_name"]
            author["email"] = row["email"]
            author["phone"]=row["phone"] ? row["phone"] : ""
            author["depart_name"] = row["depart_name"]
            author["platform_data"] = {}
            author["platform_data"]["GS"] = row["GS"] ? row["GS"] : ""
            author["platform_data"]["SC"] = row["SC"] ? row["SC"] : "" 
           
           authorsList.push(author)
        });

       return authorsList;
    }
    
    function checkRequiredFields(header){
        if(!header.includes("first_name") || !header.includes("last_name") 
        || !header.includes("email") || !header.includes("depart_name")){
            return false
        }
        return true
    }


    function uploadData(){
        axios.post('http://127.0.0.1:5000/uploadAuthors', authorsData.authors)
        .then(function (response) {
            // handle success
            console.log(response)
            setResponse([...response.data])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })  
    }

    return (
        <div className="ms-5 mt-5 me-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="mb-3">
                        <input className="form-control" type="file" id="formFile" required 
                        onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    </div>
                </div>
            </div>
            <hr className="mt-4"/>
            <div className="col-md-4 ">
                <div className="mb-3">
                    <button className="ui primary button" onClick={uploadData}
                    disabled={ authorsData.authors.length==0 ? true : false}>Upload</button>
                </div>
            </div>

            {
                response.length!=0 ? 
                <UploadLog responses={response}/> : 
                authorsData.error ? 
                <div class="alert alert-danger" role="alert">
                    {authorsData.error}
                </div>
                :
                <AuthorCheck authors={authorsData.authors} />
            }
        </div>
    );
}