"use client";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
type PageDataType = {
  name: string;
  revenue: number;
  jobs: number;
};

const Metrics = () => {
  const data: PageDataType[] = [
    {
      name: "1 Nov",
      revenue: 590,
      jobs: 800,
    },
    {
      name: "2 Nov",
      revenue: 600,
      jobs: 850,
    },
    {
      name: "3 Nov",
      revenue: 808,
      jobs: 967,
    },
    {
      name: "4 Nov",
      revenue: 1107,
      jobs: 1098,
    },
    {
      name: "5 Nov",
      revenue: 1280,
      jobs: 1200,
    },
    {
      name: "6 Nov",
      revenue: 1320,
      jobs: 1108,
    },
    {
      name: "7 Nov",
      revenue: 1200,
      jobs: 880,
    },
    {
      name: "8 Nov",
      revenue: 890,
      jobs: 800,
    },
    {
      name: "9 Nov",
      revenue: 700,
      jobs: 850,
    },
    {
      name: "10 Nov",
      revenue: 808,
      jobs: 967,
    },
  ];

  return (
    <div className="w-[60%] bg-white px-8 pt-6 pb-3 rounded-md min-w-[700px]">
      <p className="font-[600] pb-4">Performance Metrics</p>
      <div className="flex items-center gap-10 pb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-[8px] bg-[#333]"></div>
          <p className="text-sm">Revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-[8px] bg-[#BBBBBB]"></div>
          <p className="text-sm">Jobs</p>
        </div>
      </div>
      <div className="-ml-5">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1 0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#333"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="jobs"
              dot={false}
              stroke="#BBBBBB"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Metrics;
