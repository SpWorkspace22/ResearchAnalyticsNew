import "./uploadAuthor.css"
import { read, utils, writeFile } from 'xlsx';
import { useState } from "react";

export default function AuthorUpload(){
    const [authorsData,setAuthors] = useState({authors:[],error:""})

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
                <div className="col-md-4 ps-5">
                    <div className="mb-3">
                        <button className="btn btn-primary">Upload</button>
                    </div>
                </div>
            </div>
            <hr className="mt-4"/>
            <table className="ui single selectable green line table attached small mt-3">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>GS</th>
                    <th>SC</th>
                </tr>
            </thead>
            <tbody>
                {
                    authorsData.error ? <tr>{authorsData.error}</tr> :
                    authorsData.authors.map((author)=>{
                        return (
                            <tr>
                                <td>{author.first_name}</td>
                                <td>{author.last_name}</td>
                                <td>{author.email}</td>
                                <td>{author.phone}</td>
                                <td>{author.depart_name}</td>
                                <td>{author.platform_data.GS}</td>
                                <td>{author.platform_data.SC}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
            </table>
        </div>
    );
}