"use client";
import GoBack from "@/features/shared/go-back-button/go-back";
import BorderRectangle from "@/features/shared/inner-pages/bordered-rect";
import Header from "@/features/shared/inner-pages/header";
import ProfileColumn from "@/features/shared/inner-pages/profile-column";
import Wrapper from "@/features/shared/inner-pages/wrapper";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import { filledArrayFromNumber } from "@/lib/utils/array-from-number";
import {
  ComplaintsState,
  CompletedState,
  PendingState,
  RatingStar,
  YellowStar,
} from "@/public/svg";
import React, { useRef, useState } from "react";
import userOne from "@/public/user-one.png";
import SingleLineColumn from "@/features/shared/inner-pages/single-line-column";
import DescriptionColumn from "@/features/shared/inner-pages/description-column";
import StatusColumn from "@/features/shared/inner-pages/status-column";
import Reciept from "@/features/jobs/invoice/reciept";
import Image from "next/image";

const Invoice = () => {
  const status = "Completed";
  const text = `Lorem ipsum dolor sit amet consectetur. At leo felis etiam massa maecenas eget fermentum lacus. Lorem ipsum dolor sit amet consectetur. At leo felis etiam massa maecenas eget fermentum lacus. Lorem ipsum dolor sit amet consectetur. At leo felis etiam massa maecenas eget fermentum lacus.`;
  const [showModal, setShowModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    setShowModal(false);
  };
  useOnClickOutside(ref, closeModal);
  return (
    <>
      {/* Modal */}
      <div
        className={`${
          !showModal ? "hidden" : "block"
        } bg-[#000]/20 backdrop-blur-sm h-screen fixed z-10 w-full`}
      >
        <div className="flex w-full justify-center">
          <div
            className="w-[600px] bg-white max-w-auto relative p-7 overflow-y-auto h-screen"
            ref={ref}
          >
            <Reciept closeModal={setShowModal} />
          </div>
        </div>
      </div>
      <div className={`mb-20`}>
        <Header>
          <Wrapper>
            <div className="flex items-center justify-between">
              <div className="flex gap-x-6">
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
                  <p className="text-[28px] font-[600]">
                    Allen’s coaster services
                  </p>

                  <p className="mt-[2px] mb-[6px] text-sm">
                    Furniture Assembler
                  </p>

                  <div className="flex gap-x-1">
                    {filledArrayFromNumber(5).map((item, index) => (
                      <YellowStar key={index} />
                    ))}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="border border-[#333] p-3 uppercase h-fit text-[13px] font-[700] cursor-pointer outline-none"
              >
                View Invoice
              </button>
            </div>
          </Wrapper>
        </Header>

        <Wrapper>
          <div className="my-8">
            <GoBack />
          </div>
          <div className="mt-10">
            <BorderRectangle>
              <table className="w-full">
                <tbody>
                  <ProfileColumn
                    position="Customer’s profile"
                    name="Elizabeth Howard"
                    phoneNumber="+49 17687934521"
                    stars={1}
                    imageSrc={userOne.src}
                  />
                  <SingleLineColumn name="RF ID" value="5647" />
                  <SingleLineColumn name="Invoice ID" value="342" />
                  <SingleLineColumn name="Contact" value="+49 17687934521" />
                  <SingleLineColumn
                    name="Job Address"
                    value="2464 Royal Ln. Mesa, New Jersey 45463"
                  />
                  <SingleLineColumn name="Quote" value="$4,000" />
                  <DescriptionColumn name="Job Description" text={text} />
                  <SingleLineColumn
                    name="Payment method"
                    value="1256437890876"
                  />
                  <StatusColumn name="Job Status" status="Completed" />
                </tbody>
              </table>
            </BorderRectangle>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Invoice;
