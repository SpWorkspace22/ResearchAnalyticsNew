import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, LabelList } from 'recharts';

const COLORS = ['#82ca9d', '#8884d8'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ArticleByPlatform({data}) {
    return (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="130"
            cy="150"
            labelLine={true}
            label={data}
            outerRadius={120}
            fill="#8884d8"
            dataKey="total">
            <LabelList dataKey="platform_code" position='insideLeft' />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    );
}
