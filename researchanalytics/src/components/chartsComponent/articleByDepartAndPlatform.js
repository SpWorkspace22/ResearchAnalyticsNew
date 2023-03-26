import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ArticleByDepartAndPlatform({data}){
    return (
        <BarChart
          width={window.innerWidth-400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="SC" fill="#8884d8" stroke='8884d8'/>
          <Bar dataKey="GS" fill="#82ca9d"  stroke='82ca9d'/>
        </BarChart>
    );
}
