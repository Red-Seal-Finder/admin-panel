"use client";
import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { uv: 45, fill: "#8884d8" },
  { uv: 55, fill: "#82ca9d" },
  // Add more data entries with different colors if needed
];

const DoughnutChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        {data.map((entry, index) => (
          <Pie
            key={`pie-${index}`}
            data={[entry]}
            dataKey="uv"
            startAngle={90}
            endAngle={-270}
            innerRadius={70}
            outerRadius={80}
            fill={entry.fill}
            label={false}
          />
        ))}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;
