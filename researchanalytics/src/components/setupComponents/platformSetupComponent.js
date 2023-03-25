import './setupPage.css'
import {useEffect, useState} from 'react'
import axios from 'axios'

export default function PlatformSetup(){
    let [platformData,setPlatformData] = useState({
        platforms:[],platform_code:"",platform_name:""
    })

    function loadData(){
        axios.get("http://127.0.0.1:5000/platforms")
        .then((response)=>{
            setPlatformData({...platformData,platforms:response.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function handleSave(){
        axios.post("http://127.0.0.1:5000/platforms",
            {platform_code:platformData.platform_code,platform_name:platformData.platform_name})
        .then((response)=>{
            alert(response.data.message)
            loadData()
        }).catch((err)=>{
            console.log(err)
        })
    }

    function handleDelete(platform_code){
        let choice = window.confirm("Are sure to delete platform and related record..")
        if(choice){
            axios.delete("http://127.0.0.1:5000/platforms/remove",
            { params: { platform: platform_code } })
            .then((response)=>{
                console.log(response.data.message)
                loadData()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    function handleClear(){
        setPlatformData({...platformData,platform_code:"",platform_name:""})
    }

    return(
        <div className="mx-4 shadow rounded-3 px-3 pt-3 pb-3">
            <h3 className="ui dividing header">Platform Setup</h3>
            <div class="ui form">
                <div class="three fields">
                    <div class="field">
                        <label>Platform Code</label>
                        <input type="text" value={platformData.platform_code} onChange={
                            (e)=>{
                                setPlatformData({...platformData,platform_code:e.target.value})
                            }
                        }/>
                    </div>
                    <div class="field">
                        <label>Platform Name</label>
                        <input type="text" value={platformData.platform_name} onChange={
                            (e)=>{
                                setPlatformData({...platformData,platform_name:e.target.value})
                            }
                        }/>
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
            <table className="ui single selectable blue line table attached small mt-4">
            <thead>
                <tr>
                    <th>Platform Code</th>
                    <th>Platform Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { platformData.platforms.map((platform)=>{
                    return (
                        <tr key={platform.platform_code}>
                            <td>{platform.platform_code}</td>
                            <td>{platform.platform_name}</td>
                            <td>
                                {/* <button className="ui black basic small button"><i className="edit icon text-primary" > </i> Edit</button> */}
                                 <button className="ui black basic small button" 
                                    onClick={()=>{handleDelete(platform.platform_code)}}><i className="trash alternate icon text-danger" > </i> Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
}