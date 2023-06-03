import { useEffect, useState} from 'react';
import axios from 'axios';
import './articlePage.css';
import {exportAsExcel} from '../../services/exportExcel';
import { platformsApi,articlesApi,scanApi, departmentsApi } from '../../services/apiFile';

export default function ArticlesPage(department){
    let [pageData,setPageData] = useState({articles:[],article_name:'',platform_code:'',department_id:'',year:''});
    let [pageInitialData,setPageInitialData] = useState({platforms:[],departments:[]})
    let [scanStatus,setScanStatus] = useState(false)
    
    useEffect(()=>{
        async function fetchData(){
            let plat = await axios.get(platformsApi);
            let depart = await axios.get(departmentsApi);
            return {plat,depart}
        }
        fetchData().then((res)=>{
            setPageInitialData({platforms:[...res.plat.data],departments:[...res.depart.data]})
        })
    },[]);
 
    function handleRefresh(){
        axios.get(articlesApi).then((response)=>{
            setPageData({articles:response.data,article_name:'',platform_code:'',department_id:'',year:''})
        }).catch((err)=>{
            console.log(err)
        });
    }

    function findByFilterCriteria(filterCriteria){
        axios.get(articlesApi,{ params: filterCriteria })
        .then((response)=>{
            setPageData({...pageData,articles:response.data});
        }).catch((err)=>{
            console.log(err)
        })
    }

    function handleSearch(){
        findByFilterCriteria({
            article_name:pageData.article_name,platform_code:pageData.platform_code,
            department_id:pageData.department_id,year:pageData.year});
    }

    function handleClear(){
        setPageData({...pageData,article_name:'',platform_code:'',department_id:'',year:''})
        console.log(pageData)
    }
	
	
	function handleScan(){
        axios.get(scanApi).then((response)=>{
            alert(response.data.message)
            setScanStatus(false)
        }).catch((err)=>{
            console.log(err)
        });

        setScanStatus(true)
    }

    function handleExportAsExcel(){
        const headings = [
            ['Article Id','Article Name','Citation','Journal','Platform','Year','Author','Department']
        ]
        exportAsExcel(headings,pageData.articles);
    }


    return(
        <div className="mt-4 ms-3 me-3">
            <h4 className="ui dividing header text-primary">Search Criteria</h4>
            <div className="ui form mb-1">
                <div className="field">
                    <div className="four fields">
                        <div className="field">
                            <label>Article Name</label>
                            <input type="text" name="searchEmail" 
                            values={pageData.article_name} 
                            onChange={(e)=>setPageData({...pageData,article_name:e.target.value})} placeholder="a@gmail.com"/>
                        </div>
                        <div className="field">
                            <label>Platform Type</label>
                            <select className="ui fluid dropdown" name="platform" id="paltform"
                            value={pageData.platform_code}
                            onChange={(e)=>setPageData({...pageData,platform_code:e.target.value})}>
                                <option value="-1" selected></option>
                                {
                                    pageInitialData.platforms.map((platform)=>{
                                        return (
                                            <option  
                                                key={platform.platform_code}
                                                value={platform.platform_code}
                                                selected={pageData.platform_code===platform.platform_code}>
                                                {platform.platform_name.toUpperCase()}
                                            </option>
                                        );
                                    })
                            }
                            </select>
                        </div>
                        <div className="field">
                            <label>Departments</label>
                            <select className="ui fluid dropdown" name="department"  id="department"
                            value={pageData.department_id}
                            onChange={(e)=>setPageData({...pageData,department_id:e.target.value})}>
                                <option value='-1' selected></option>
                                {
                                pageInitialData.departments.map((department)=>{
                                    return (
                                        <option 
                                                key={department.department_id}
                                                value={department.department_id}
                                                selected={department.department_id===pageData.department_id?true:false}>
                                                {department.department_name.toUpperCase()
                                                }
                                        </option>
                                    );
                                })
                            }
                            </select>
                        </div>
                        <div className="field">
                            <label>Year</label>
                            <input type="text" name="year" value={pageData.year} 
                            onChange={(e)=>setPageData({...pageData,year:e.target.value})}/>
                        </div>                      
                    </div>
                    <button className="ui primary button" onClick={handleSearch}>Search</button>
                    <button className="ui basic button" onClick={handleClear}>Clear</button>
                </div>
            </div>
            <hr/>
            <div className="two fields">
                <div className="field">
                    <button type="button" className="ui green button" 
                    onClick={handleScan} disabled={scanStatus}>
                        { scanStatus ? <i class="loading spinner icon"></i>:"" }
                        Scan
                    </button>
                    <button type="button" onClick={handleRefresh}
                        className="ui olive right floated circular icon button">
                            <i className="sync alternate icon"></i>
                    </button>
                    <button class="ui green right floated circular button">
                    <i class="file excel icon"></i>
                        Export Data
                    </button>
                </div>
            </div>
            <table className="ui fixed selectable blue line table attached mt-3" id="article">
            <thead>
                <tr>
                    <th className='one wide'>Article Id</th>
                    <th className='six wide'>Article Name</th>
                    <th className='two wide'>Journal Name</th>
                    <th className='one wide'>Year</th>
                    <th className='one wide'>Citation</th>
                    <th className='two wide'>Platform</th>
                    <th className='two wide'>Department</th>
                    <th className='two wide'>Author</th>
                </tr>
            </thead>
            <tbody>
                {
                    pageData.articles.map((article)=>{
                        return (
                            <tr key={article.Article_Id}>
                                <td className='one wide'>{article.Article_Id}</td>
                                <td className='six wide'>{article.Article_Name}</td>
                                <td className='two wide'>{article.Journal}</td>
                                <td className='one wide'>{article.Year}</td>
                                <td className='one wide'>{article.Citation}</td>
                                <td className='two wide'>{article.Platform.toUpperCase()}</td>
                                <td className='two wide'>{article.Author_Name}</td>
                                <td className='two wide'>{article.Department_Name}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
            </table>
        </div>
    );
}