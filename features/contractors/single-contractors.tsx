"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../shared/inner-pages/header";
import Wrapper from "../shared/inner-pages/wrapper";
import { filledArrayFromNumber } from "@/lib/utils/array-from-number";
import { RatingStar } from "@/public/svg";
import GoBack from "../shared/go-back-button/go-back";
import BorderRectangle from "../shared/inner-pages/bordered-rect";
import SingleLineColumn from "../shared/inner-pages/single-line-column";
import Image from "next/image";
import JobsHistory from "./components/job-history";
import DownloadButton from "../shared/page-body/download-button";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux/hooks";
import { extractFirstLetter } from "@/lib/utils/extract-initials";
import ActionColumn from "../shared/inner-pages/action-column";
import ActionButton from "../shared/inner-pages/action-button";
import {
  changeContractorStatus,
  validateAContractorDocument,
} from "@/lib/api/api";
import LoadingTemplate from "../layout/loading";
import { redirect } from "next/navigation";

const SingleContractor = () => {
  const { value: contractorDetails } = useAppSelector(
    (state: RootState) => state.singleContractorDetail
  );
  useLayoutEffect(() => {
    if (contractorDetails.contractorProfile._id === "") {
      redirect("/contractors");
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const validateDocuments = () => {
    setIsLoading(true);
    validateAContractorDocument({
      contractorDocsId: contractorDetails.contractorProfile._id,
    }).then((response) => {
      if (response) {
        setIsLoading(false);
      }
    });
  };

  const handleChangeStatus = (status: string) => {
    setIsLoading(true);
    changeContractorStatus({
      contractorId: contractorDetails.contractorProfile._id,
      status: status,
    }).then((response) => {
      if (response) {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Header>
        <Wrapper>
          <div className="flex gap-x-6 item-center">
            <div className="w-[86px] h-[86px] flex item-center justify-center">
              {contractorDetails?.contractorProfile.profileImage && (
                <Image
                  src={contractorDetails?.contractorProfile.profileImage}
                  alt=""
                  width={87}
                  height={87}
                  className="rounded-[50%]"
                />
              )}
              {!contractorDetails?.contractorProfile.profileImage && (
                <div className="w-[86px] h-[86px] rounded-[50%] bg-[#D9D9D9] flex items-center justify-center">
                  <p className="text-[30px] font-[600] text-white">
                    <span className="capitalize">
                      {extractFirstLetter(
                        contractorDetails.contractorProfile.firstName
                      )}
                    </span>
                    <span className="capitalize">
                      {extractFirstLetter(
                        contractorDetails.contractorProfile.lastName
                      )}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="-mt-2">
              <p className="text-[28px] font-[600]">
                <span className="capitalize">
                  {contractorDetails.contractorProfile.firstName}
                </span>{" "}
                <span className="capitalize">
                  {contractorDetails.contractorProfile.lastName}
                </span>
              </p>

              <p className="mt-[2px] mb-[6px] text-sm capitalize">
                {contractorDetails?.document?.skill === undefined
                  ? "Not Submitted"
                  : contractorDetails?.document?.skill}
              </p>

              <div className="flex gap-x-1">
                {filledArrayFromNumber(5).map((contractorDetails, index) => (
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

        {isLoading && <LoadingTemplate />}
        <div className="">
          <BorderRectangle>
            <table className="w-full">
              <tbody>
                <SingleLineColumn
                  name="Email"
                  value={contractorDetails.contractorProfile.email}
                />
                <SingleLineColumn name="Contact" value="" />
                <SingleLineColumn name="Amount Spent" value="$" />
                <SingleLineColumn name="NO. of jobs" value="No jobs yet" />
                <SingleLineColumn name="Payment account" value="" />
                <SingleLineColumn
                  name="Location"
                  value={contractorDetails.contractorProfile.location}
                />
                <ActionColumn>
                  <div className="flex gap-x-4">
                    <ActionButton
                      actionName="Validate Document"
                      onClick={validateDocuments}
                      color="border-green-600 text-green-600"
                    />
                    <ActionButton
                      actionName="Activate"
                      onClick={() => handleChangeStatus("active")}
                      color="border-green-600 text-green-600"
                    />
                    <ActionButton
                      actionName="Review"
                      onClick={() => handleChangeStatus("in-review")}
                      color="border-yellow-500 text-yellow-500"
                    />
                    <ActionButton
                      actionName="Close"
                      onClick={() => handleChangeStatus("closed")}
                      color="border-red-600 text-red-600"
                    />
                    <ActionButton
                      actionName="Suspend"
                      onClick={() => handleChangeStatus("suspend")}
                      color="border-red-600 text-red-600"
                    />
                  </div>
                </ActionColumn>
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
