import { AreaChart,Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function ArticleTrendByYear({artByYear})  {
    return (    
        <AreaChart
          width={window.innerWidth-100}
          height={300}
          data={artByYear}
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
