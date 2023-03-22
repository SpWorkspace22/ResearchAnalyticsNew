import ArticleTrendByYear from "./chartsComponent/articleTrendByYear";
import { ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";
import AuthorByPlatform from "./chartsComponent/authorByPlatform";

export default function DashboardComponenet(){
    

    return (
        <div className="container-fluid ">
            <h2 className="ui dividing header blue pb-3 pt-3">Summary Page</h2>
            <div className=" rounded-50" style={{width:"100%",height:"100vh"}}>
                <div className="ui grid">
                    <div className="sixteen wide column mt-2">
                        <div class="ui four statistics shadow rounded-4 p-4">
                        <div class="statistic ">
                            <div class="value">
                            22
                            </div>
                            <div class="label">
                            Saves
                            </div>
                        </div>
                        <div class="statistic">
                            <div class="text value">
                                Three<br/>Thousand
                            </div>
                            <div class="label">
                                Signups
                            </div>
                        </div>
                        <div class="statistic">
                            <div class="value">
                            <i class="plane icon"></i> 5
                            </div>
                            <div class="label">
                            Flights
                            </div>
                        </div>
                        <div class="statistic">
                            <div class="value">
                            <img src="/images/avatar/small/joe.jpg" class="ui circular inline image" />
                            42
                            </div>
                            <div class="label">
                            Team Members
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="sixteen wide column mt-1 shadow rounded-4 p-4">
                        <h4 className="ui header ms-4 mt-2">Article Published Over The Year</h4>
                        <ResponsiveContainer width={"100%"} height={"100%"} > 
                            <ArticleTrendByYear/>
                        </ResponsiveContainer>
                    </div>
                    <div className="sixteen wide column shadow rounded-4 p-4">
                        <h4 className="ui header ms-4 mt-2">Article Published By Author</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <AuthorByPlatform />
                        </ResponsiveContainer>
                    </div>
                    <div className="four wide column"></div>
                    <div className="four wide column"></div>
                </div>
            </div>
        </div>
    );
}


