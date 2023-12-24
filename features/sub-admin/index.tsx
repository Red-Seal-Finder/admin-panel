import React from "react";
import Header from "../layout/header/header";
import Searchbar from "../layout/header/components/searchbar";
import PageBody from "../shared/page-body/page-body";
import CustomersTable from "./table";
import PageHeading from "../shared/page-body/page-heading";
import DownloadButton from "../shared/page-body/download-button";

const SubAdmins = () => {
  return (
    <>
      <Header>
        <></>
      </Header>
      {/* Page Body - Use for side padding on the top and sides */}
      <PageBody>
        <div className="flex justify-between mb-6 items-center">
          <PageHeading page_title="Sub Admins" />
          <DownloadButton text="Download Sub Admins LIST" />
        </div>
        <CustomersTable />
      </PageBody>
    </>
  );
};

export default SubAdmins;
