import React from "react";
import Header from "../layout/header/header";
import Searchbar from "../layout/header/components/searchbar";
import PageBody from "../shared/page-body/page-body";
import OverviewTable from "./components/table";
import PageHeading from "../shared/page-body/page-heading";
import Calender from "./components/calender";
import Metrics from "./components/metrics";
import JobStatus from "./components/job-status";

const Overview = () => {
  return (
    <>
      <Header>
        <Searchbar />
      </Header>
      {/* Page Body - Use for side padding on the top and sides */}
      <PageBody>
        <div className="flex justify-between mb-6 items-center">
          <PageHeading page_title="Overview" />
          <Calender />
        </div>
        {/* Charts */}
        <div className="flex gap-6 justify-between w-full mb-6 overflow-x-auto">
          <Metrics />
          <JobStatus />
        </div>
        <OverviewTable />
      </PageBody>
    </>
  );
};

export default Overview;
