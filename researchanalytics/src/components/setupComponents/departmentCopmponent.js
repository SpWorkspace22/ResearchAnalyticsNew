import {useEffect, useState} from 'react'
import axios from 'axios'
import './setupPage.css'
import { departmentsApi, removeDepartmentApi } from '../../services/apiFile'

export default function DepartMentSetup(){
    let [departmentData,setDepartmentData] = useState({
        departments:[],department_id:"",departmentName:""
    })


    function loadData(){
        axios.get(departmentsApi)
        .then((response)=>{
            setDepartmentData({...departmentData,departments:response.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function handleSave(){
        axios.post(departmentsApi,
                {depart_name:departmentData.departmentName})
        .then((response)=>{
            alert(response.data.message)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // function handleEdit(department){
    //     setDepartmentData({...departmentData,
    //         department_id:department.department_id,departmentName:department.department_name})
    // }

    function handleDelete(department_id){
        let choice = window.confirm("Are you sure to remove department and related record")
        if(choice){
            axios.delete(removeDepartmentApi,
            { params: { department: department_id } })
            .then((response)=>{
                alert(response.data.message)
                loadData()
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    function handleClear(){
        setDepartmentData({...departmentData,
            department_id:"",departmentName:""})
    }


    return(
        <div className="mx-4 shadow rounded-3 px-3 pt-3 pb-3">
            <h3 className="ui dividing header">Department Setup</h3>
            <div class="ui form">
                <div class="three fields">
                    {/* <div class="field">
                        <label>Department Id</label>
                        <input type="text" placeholder="" value={departmentData.department_id} readOnly />
                    </div> */}
                    <div class="field">
                        <label>Department Name</label>
                        <input type="text" value={departmentData.departmentName} 
                        onChange={(e)=>{setDepartmentData({...departmentData,departmentName:e.target.value})}}/>
                    </div>
                </div>
                <div class="fields">
                    <div class="field">
                        <button className="ui basic primary button" onClick={handleSave}>Save</button>
                    </div>
                    <div class="field">
                        <button className="ui basic black button" onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </div>
            <button type="button" onClick={loadData}
            className="ui olive right floated circular icon button mb-1">
                <i className="sync alternate icon"></i>
            </button>
            <table className="ui single selectable red line table attached small mt-4">
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { departmentData.departments.map((department)=>{
                    return (
                        <tr key={department.department_id}>
                            <td>{department.department_id}</td>
                            <td>{department.department_name}</td>
                            <td>
                                {/* <button className="ui black basic small button" onClick={()=>{handleEdit(department)}}><i className="edit icon text-primary" > </i> Edit</button> */}
                                 <button className="ui black basic small button" onClick={()=>{handleDelete(department.department_id)}}><i className="trash alternate icon text-danger" > </i> Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
}