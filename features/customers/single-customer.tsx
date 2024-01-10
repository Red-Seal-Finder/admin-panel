"use client";
import React from "react";
import Header from "../shared/inner-pages/header";
import Wrapper from "../shared/inner-pages/wrapper";
import { filledArrayFromNumber } from "@/lib/utils/array-from-number";
import { RatingStar } from "@/public/svg";
import GoBack from "../shared/go-back-button/go-back";
import BorderRectangle from "../shared/inner-pages/bordered-rect";
import SingleLineColumn from "../shared/inner-pages/single-line-column";
import JobsHistory from "./components/job-history";
import DownloadButton from "../shared/page-body/download-button";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { extractInitials } from "@/lib/utils/extract-initials";

const SingleCustomer = () => {
  const { value: customerDetails } = useAppSelector(
    (state: RootState) => state.singleCustomerDetail
  );

  return (
    <>
      <Header>
        <Wrapper>
          <div className="flex gap-x-6 items-center">
            <div className="w-[86px] h-[86px] rounded-[50%] bg-[#D9D9D9] flex items-center justify-center">
              <p className="text-[30px] font-[600] text-white">
                {extractInitials(customerDetails.fullName)}
              </p>
            </div>

            <div className="-mt-2">
              <p className="text-[28px] font-[600]">
                {customerDetails.fullName}
              </p>
              <div className="flex gap-x-1">
                {filledArrayFromNumber(5).map((item, index) => (
                  <RatingStar key={index} />
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      </Header>

      <Wrapper>
        <div className="my-8">
          <GoBack />
        </div>
        <div className="">
          <BorderRectangle>
            <table className="w-full">
              <tbody>
                <SingleLineColumn name="Email" value={customerDetails.email} />
                <SingleLineColumn
                  name="Contact"
                  value={customerDetails.phoneNumber}
                />
                <SingleLineColumn name="Amount Spent" value="$" />
                <SingleLineColumn name="NO. of jobs" value="No jobs yet" />
                <SingleLineColumn name="Payment account" value="" />
                <SingleLineColumn name="Address" value="" />
              </tbody>
            </table>
          </BorderRectangle>
        </div>

        <div className="mt-24 mb-10 flex flex-col">
          <div className="self-end mb-7">
            <DownloadButton text="Download JOB HISTORY" />
          </div>
          <JobsHistory />
        </div>
      </Wrapper>
    </>
  );
};

export default SingleCustomer;
