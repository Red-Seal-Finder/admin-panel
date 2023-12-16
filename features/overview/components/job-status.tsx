import React from "react";
import { DoughnutChart, HalfDoughnutChart } from "./doughnut-chart";

const JobStatus = () => {
  return (
    <div className="w-[40%] bg-white px-8 pt-6 pb-3 rounded-md min-w-[400px]">
      <p className="font-[600] uppercase">JOB STATUS</p>
      <div className="-mt-10">
        <HalfDoughnutChart name="Total Jobs" color="#333333" percent={60} />
      </div>
      <div className="grid grid-cols-3">
        <DoughnutChart color="#024E82" percent={10} name="Pending" />
        <DoughnutChart color="#0D8012" percent={45} name="Successful" />
        <DoughnutChart color="#9A0101" percent={5} name="Complaints" />
      </div>
    </div>
  );
};

export default JobStatus;
