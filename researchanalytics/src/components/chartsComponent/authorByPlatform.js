import axios from 'axios';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AuthorByPlatform() {
     let [data,setData] = useState([])

    useEffect(()=>{
      axios.get('http://127.0.0.1:5000/summary')
      .then((response)=>{
        setData([...response.data.artPubByPlatform]);
      }).catch((err)=>{
        console.log(err)
      })
    },[])
    
    return (
        <BarChart
          width={window.innerWidth-100}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="SC" fill="#439A97" />
          <Bar dataKey="GS" fill="#82ca9d" />
        </BarChart>
    );
}
