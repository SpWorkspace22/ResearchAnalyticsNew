import { ResponsiveContainer } from 'recharts';
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { summaryApi } from '../services/apiFile';

const AuthorByPlatform = React.lazy(()=> import("./chartsComponent/authorByPlatform"));
const CountSummaryData = React.lazy(()=> import("./chartsComponent/countSummaryData"));
const ArticleTrendByYear = React.lazy(()=> import("./chartsComponent/articleTrendByYear"));
const ArticleByPlatform = React.lazy(()=> import('./chartsComponent/articleByPlatforms'));
const ArticleByDepartAndPlatform = React.lazy(()=> import('./chartsComponent/articleByDepartAndPlatform'));

export default function DashboardComponenet(){
    let [data,setData] = useState({
        artPubByPlatform:[],
        artPubByYear:[],
        countSummary:{authors:0,articles:0,platforms:0},
        artCountByPlatformCode:[],
        artCountByDepAndPlat:[]
    })
  


    useEffect(()=>{
      axios.get(summaryApi)
      .then((response)=>{
        console.log(response.data)
        setData(response.data)
      }).catch((err)=>{
        console.log(err)
      })
        
    },[])
    

    return (
        <div className="container-fluid">
            <h2 className="ui dividing header blue pb-3 pt-3">Summary Page</h2>
            <div style={{width:"100%",height:"100vh"}}>
                <div className="ui grid">
                    <div className="sixteen wide column mt-2">
                        <Suspense fallback={ 
                            <div class="ui active dimmer">
                                <div class="ui loader"></div>
                            </div>}>
                            <CountSummaryData countSummary={data.countSummary}/>
                        </Suspense>
                    </div>
                    <div className="sixteen wide column shadow rounded-5 mt-3 mx-3">
                        <div className='ui grid'>
                            <div className='three wide column  rounded-5 pt-4'>
                                <h4 className="ui header ms-4 mt-2">Article Published On Platforms</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <Suspense fallback={ 
                                        <div class="ui active dimmer">
                                            <div class="ui loader"></div>
                                        </div>}>
                                        <ArticleByPlatform data={data.artCountByPlatformCode} />
                                    </Suspense>
                                </ResponsiveContainer>
                            </div>
                            <div className='thirteen wide column  rounded-5'>
                                <h4 className="ui header ms-4 mt-2">Article Published On Platforms (By Departments)</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <Suspense fallback={ 
                                        <div class="ui active dimmer">
                                            <div class="ui loader"></div>
                                        </div>}>
                                        <ArticleByDepartAndPlatform data={data.artCountByDepAndPlat}/>
                                    </Suspense>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="sixteen wide column mt-3 mx-3 shadow rounded-5 p-4">
                        <h4 className="ui header ms-4 mt-2">Article Published Over The Year</h4>
                        <ResponsiveContainer width={"100%"} height={"100%"} >
                            <Suspense fallback={ 
                                <div class="ui active dimmer">
                                    <div class="ui loader"></div>
                                </div>}>
                                    <ArticleTrendByYear artByYear={data.artPubByYear}/>
                                </Suspense> 
                        </ResponsiveContainer>
                    </div>
                    <div className="sixteen wide column mt-3 mx-3 shadow rounded-5 p-4">
                        <h4 className="ui header ms-4 mt-2">Article Published By Author</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <Suspense fallback={ 
                                <div class="ui active dimmer">
                                    <div class="ui loader"></div>
                                </div>}>
                                <AuthorByPlatform artPubByPlatform={data.artPubByPlatform}/>
                            </Suspense>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}


