import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, AreaChart,Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Text } from 'recharts';

import axios from 'axios'

export default function ArticleTrendByYear()  {
 let [data,setData] = useState([])

    useEffect(()=>{
      axios.get('http://127.0.0.1:5000/summary')
      .then((response)=>{
        setData([...response.data.artPubByYear]);
      }).catch((err)=>{
        console.log(err)
      })
    },[])

    return (    
        <AreaChart
          width={window.innerWidth-100}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Legend />
          <Area connectNulls type="monotone" dataKey="SC" stroke="#8884d8" fill="#8884d8" activeDot={{ r: 8 }} />
          <Area connectNulls type="monotone" dataKey="GS" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
    );
}
