import { useEffect, useState} from 'react';
import axios from 'axios';
import './articlePage.css';
import {exportAsExcel} from '../../services/exportExcel';
import { platformsApi,articlesApi,scanApi, departmentsApi } from '../../services/apiFile';
import { loadDepartment } from '../../services/departmentServices';

export default function ArticlesPage(department){
    const [pageData,setPageData] = useState({articles:[],article_name:'',platform_code:''});
    let [pageInitialData,setPageInitialData] = useState({platforms:[],departments:[]})
    let [scanStatus,setScanStatus] = useState(false)
    
    useEffect(()=>{
        // let data = loadDepartment();
        // console.log(data);
        // setPlatforms([...data])
        // axios.get(platformsApi).then(function (response) {
        //     // handle success
        //     setPlatforms([...response.data])
        // }).catch(function (error) {
        //     // handle error
        //     console.log(error);
        // });

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
            setPageData({articles:response.data,article_name:'',platform_code:''})
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
        let article_name=pageData.article_name;
        let platform_code = pageData.platform_code;

        if(article_name!=="" && platform_code!==""){
            findByFilterCriteria({article_name:pageData.article_name,platform_code:pageData.platform_code})
        }else if(platform_code!=="" && platform_code!=="-1"){
            findByFilterCriteria({platform_code:pageData.platform_code})
        }else{
            findByFilterCriteria({article_name:pageData.article_name})
        }
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
            ['Article Id','Article Name','Citation','Journal','Platform','Year']
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
                            <select className="ui fluid dropdown" name="depart" 
                            onChange={(e)=>setPageData({...pageData,platform_code:e.target.value})}>
                                <option value="-1"></option>
                                {
                                pageInitialData.platforms.map((platform)=>{
                                    return (
                                        <option 
                                            value={platform.platform_code} 
                                            selected={pageData.platform_code===platform.platform_code?true:false}
                                        >
                                        {platform.platform_name.toUpperCase()}
                                        </option>
                                    );
                                })
                            }
                            </select>
                        </div>
                        <div className="field">
                            <label>Departments</label>
                            <select className="ui fluid dropdown" name="depart"
                            onChange={(e)=>setPageData({...pageData,depart_id:e.target.value})}>
                                <option value="-1"></option>
                                {
                                   pageInitialData.departments.map((department)=>{
                                        return (
                                            <option 
                                                value={department.department_id} 
                                                selected={department.department_id===pageData.depart_id?true:false}
                                            >
                                            {department.department_name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label>Year</label>
                            <input type="text" name="year" />
                        </div>                      
                    </div>
                    <button className="ui primary button" onClick={handleSearch}>Search</button>
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
                    <th className='eight wide'>Article Name</th>
                    <th className='two wide'>Journal Name</th>
                    <th className='one wide'>Published Year</th>
                    <th className='one wide'>Citation</th>
                    <th className='two wide'>Platform</th>
                </tr>
            </thead>
            <tbody>
                {
                    pageData.articles.map((article)=>{
                        return (
                            <tr>
                                <td className='one wide'>{article.Article_Id}</td>
                                <td className='eight wide'>{article.Article_Name}</td>
                                <td className='two wide'>{article.Journal}</td>
                                <td className='one wide'>{article.Year}</td>
                                <td className='one wide'>{article.Citation}</td>
                                <td className='two wide'>{article.Platform.toUpperCase()}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
            </table>
        </div>
    );
}