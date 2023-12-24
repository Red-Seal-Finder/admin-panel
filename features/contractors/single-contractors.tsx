import React from "react";
import Header from "../shared/inner-pages/header";
import Wrapper from "../shared/inner-pages/wrapper";
import { filledArrayFromNumber } from "@/lib/utils/array-from-number";
import { RatingStar, YellowStar } from "@/public/svg";
import GoBack from "../shared/go-back-button/go-back";
import BorderRectangle from "../shared/inner-pages/bordered-rect";
import SingleLineColumn from "../shared/inner-pages/single-line-column";
import Image from "next/image";
import JobsHistory from "./components/job-history";
import DownloadButton from "../shared/page-body/download-button";

const SingleContractor = () => {
  return (
    <>
      <Header>
        <Wrapper>
          <div className="flex gap-x-6 items-center">
            <div className="w-[86px] h-[86px] flex items-center justify-center">
              <Image
                src="/contractor-logo.svg"
                alt=""
                width={87}
                height={87}
                className="rounded-[50%]"
              />
            </div>

            <div className="-mt-2">
              <p className="text-[28px] font-[600]">Allen’s coaster services</p>

              <p className="mt-[2px] mb-[6px] text-sm">Furniture Assembler</p>

              <div className="flex gap-x-1">
                {filledArrayFromNumber(5).map((item, index) => (
                  <YellowStar key={index} />
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
                <SingleLineColumn name="RF ID" value="5647" />
                <SingleLineColumn name="Email" value="raphaelokoye@gmail.com" />
                <SingleLineColumn name="Contact" value="+49 17687934521" />
                <SingleLineColumn name="Amount Spent" value="$4,000" />
                <SingleLineColumn name="NO. of jobs" value="90" />
                <SingleLineColumn
                  name="Payment account"
                  value="1256437890876"
                />
                <SingleLineColumn
                  name="Address"
                  value="2464 Royal Ln. Mesa, New Jersey 45463"
                />
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

export default SingleContractor;
