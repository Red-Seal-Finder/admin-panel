import React from "react";
import Header from "../layout/header/header";
import Searchbar from "../layout/header/components/searchbar";
import PageBody from "../shared/page-body/page-body";
import CustomersTable from "./components/table";
import PageHeading from "../shared/page-body/page-heading";
import DownloadButton from "../shared/page-body/download-button";

const Transactions = () => {
  return (
    <>
      <Header>
        <Searchbar />
      </Header>
      {/* Page Body - Use for side padding on the top and sides */}
      <PageBody>
        <div className="flex justify-between mb-6 items-center">
          <PageHeading page_title="Transactions" />
          <DownloadButton text="Download Transaction’s LIST" />
        </div>
        <CustomersTable />
      </PageBody>
    </>
  );
};

export default Transactions;