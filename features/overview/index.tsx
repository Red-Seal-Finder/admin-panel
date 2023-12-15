import React from "react";
import Header from "../layout/header/header";
import Searchbar from "../layout/header/components/searchbar";
import PageBody from "../shared/page-body/page-body";
import OverviewTable from "./components/table";
import PageHeading from "../shared/page-body/page-heading";
import Calender from "./components/calender";
import CustomCalendar from "./components/calender-icon";

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
        <OverviewTable />
      </PageBody>
    </>
  );
};

export default Overview;
