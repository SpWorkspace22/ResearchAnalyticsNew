import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function AuthorByPlatform({artPubByPlatform}) {

    return (
        <BarChart
          width={window.innerWidth-100}
          height={300}
          data={artPubByPlatform}
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
          <Bar dataKey="SC" fill="#ffc658" />
          <Bar dataKey="GS" fill="#82ca9d" />
        </BarChart>
    );
}
