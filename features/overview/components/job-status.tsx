import React from "react";
import DoughnutChart from "./doughnut-chart";

const JobStatus = () => {
  return (
    <div className="w-[40%] bg-white px-8 pt-6 pb-3 rounded-md min-w-[450px]">
      <p className="font-[600] uppercase pb-4">JOB STATUS</p>
      <DoughnutChart />
    </div>
  );
};

export default JobStatus;
