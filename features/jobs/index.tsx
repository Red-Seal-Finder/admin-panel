import React from "react";
import Header from "../layout/header/header";
import Searchbar from "../layout/header/components/searchbar";
import PageBody from "../shared/page-body/page-body";
import JobsTable from "./components/table";
import PageHeading from "../shared/page-body/page-heading";
import DownloadButton from "../shared/page-body/download-button";
import Calender from "../overview/components/calender";
import AnalyticCard from "./components/analytic-card";
import { CancelIconBlue, CancelIconRed, JobIcon } from "@/public/svg";
import userPic from "@/public/admin-pic.png";
const Jobs = () => {
  return (
    <>
      <Header />

      {/* Page Body - Use for side padding on the top and sides */}
      <PageBody>
        <div className="flex justify-between mb-6 items-center">
          <PageHeading page_title="Jobs" />
          <Calender />
        </div>
        {/* Analytic Cards */}
        <div className="overflow-x-auto mb-6">
          <div className="flex gap-8 min-w-[1200px]">
            <AnalyticCard
              icon={<JobIcon />}
              iconColor="bg-[#C398C7]"
              borderColor="border-l-[#721279]"
              name="Most requested job"
              info="Furniture assembly"
            />
            <AnalyticCard
              icon={<CancelIconBlue />}
              iconColor="bg-[#AAB2D4]"
              borderColor="border-l-[#00235B]"
              name="No. of cancellations"
              info="200"
            />
            <AnalyticCard
              icon={<CancelIconRed />}
              iconColor="bg-[#F6B7B7]"
              borderColor="border-l-[#9A0101]"
              name="Top reason for cancellation"
              info="Emergency"
            />
            <AnalyticCard
              icon="/admin-pic.png"
              borderColor="border-l-[#615D09]"
              name="Top-rated contractor"
              info="Raphael Okoye"
            />
          </div>
        </div>
        {/* Job Table */}
        <div className="my-10 flex flex-col">
          <div className="self-end mb-7">
            <DownloadButton text="Download JOB LIST" />
          </div>

          <JobsTable />
        </div>
      </PageBody>
    </>
  );
};

export default Jobs;
