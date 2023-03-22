import { useState} from 'react'
import axios from 'axios';
import './articlePage.css'

export default function ArticlesPage(){
    const [pageData,setPageData] = useState({articles:[],article_name:'',platform_code:''});

    function handleRefresh(){
        axios.get('http://127.0.0.1:5000/articles').then((response)=>{
            setPageData({articles:response.data,article_name:'',platform_code:''})
        }).catch((err)=>{
            console.log(err)
        });
    }

    function findByFilterCriteria(filterCriteria){
        axios.get('http://127.0.0.1:5000/articles',{ params: filterCriteria })
        .then((response)=>{
            setPageData({...pageData,articles:response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    function handleSearch(){
        let article_name=pageData.article_name;
        let platform_code = pageData.platform_code;

        if(article_name!=="" && platform_code!==""){
            findByFilterCriteria({article_name:pageData.article_name,platform_code:pageData.platform_code})
        }else if(platform_code!="" && platform_code!=="-1"){
            findByFilterCriteria({platform_code:pageData.platform_code})
        }else{
            findByFilterCriteria({article_name:pageData.article_name})
        }
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
                                <option value="GS">Google Scholar</option>
                                <option value="SC">Scopus</option>
                            </select>
                        </div>                      
                    </div>
                    <button className="ui primary button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <hr/>
            <div className="two fields">
                <div className="field">
                    <button type="button" className="ui green button">Scan</button>
                    <button type="button" onClick={handleRefresh}
                    className="ui olive right floated circular icon button">
                        <i className="sync alternate icon"></i>
                    </button>
                </div>
            </div>
            <table className="ui fixed selectable blue line table attached mt-3">
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