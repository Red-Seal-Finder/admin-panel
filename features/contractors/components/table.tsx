"use client";
import React, { useEffect, useState } from "react";
import TableCard from "@/features/shared/table/components/table-card";
import Heading from "@/features/shared/table/components/table-heading";
import Searchbar from "@/features/shared/table/components/searchbar";
import Filter from "@/features/shared/table/components/filter";
import Paginator from "@/features/shared/table/components/paginator";
import TableOverflow from "@/features/shared/table/components/table-overflow";
import Table from "@/features/shared/table/components/table";
import Thead from "@/features/shared/table/components/thead";
import Th from "@/features/shared/table/components/th";
import Td from "@/features/shared/table/components/td";
import {
  CompletedState,
  PendingState,
  RatingStar,
  YellowStar,
} from "@/public/svg";
import { usePathname, useRouter } from "next/navigation";
import { getContactorDetail } from "@/lib/api/api";
import { IContractors, IContractorsDetails } from "@/lib/types";
import Action from "./action";
import { filledArrayFromNumber } from "@/lib/utils/array-from-number";
import { trimString } from "@/lib/utils/trim-string";
import { setsingleContractorsDetail } from "../../../lib/redux/slices/single-contractor";
import { useAppDispatch } from "@/lib/redux/hooks";

// Since the table data is dynamic a table component will replace by this template
// This Template defines how you can implement any table on your page

const table_headings = [
  "Contractor’s Name",
  "Skill",
  "Status",
  "Email Address",
  "No of Jobs",
  "Ratings",
  "Action",
];

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContractorsTable: React.FC<IProps> = ({ setLoading }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [contractors, setContractors] = useState<IContractors>();

  useEffect(() => {
    const data = {
      page: 1,
      limit: 50,
    };

    getContactorDetail(data).then((response: IContractors) => {
      console.log(response);
      setLoading(false);
      setContractors(response);
    });
  }, []);

  const dispatch = useAppDispatch();

  const handleViewAContractors = (item: IContractorsDetails) => {
    dispatch(setsingleContractorsDetail(item));
    router.push(`${pathname}/${item.contractorProfile._id}`);
  };

  return (
    <TableCard>
      <div className="flex items-center justify-between w-full">
        <Heading name="Contractors’ list" />
        <div className="flex gap-8">
          <Searchbar />
          <Filter />
        </div>
      </div>

      <TableOverflow>
        <Table>
          <Thead>
            <tr>
              {table_headings?.map((heading, index) => (
                <Th key={index}>{heading}</Th>
              ))}
            </tr>
          </Thead>

          <tbody>
            {contractors?.artisans.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => handleViewAContractors(item)}
              >
                <Td>
                  <span className="capitalize">
                    {trimString(item.contractorProfile.firstName, 10)}
                  </span>

                  <span className="capitalize">
                    {" "}
                    {trimString(item.contractorProfile.lastName, 5)}
                  </span>
                </Td>
                <Td>
                  <span className="capitalize">
                    {item?.document?.skill === undefined
                      ? "Not Submitted"
                      : item?.document?.skill}
                  </span>
                </Td>
                <Td>
                  {item.document !== null ? (
                    <div className="flex gap-[6px] items-center">
                      <CompletedState />
                      <span className="capitalize">Verified</span>
                    </div>
                  ) : (
                    <div className="flex gap-[6px] items-center">
                      <PendingState />
                      <span className="capitalize">Pending</span>
                    </div>
                  )}
                </Td>

                <Td>{trimString(item.contractorProfile.email, 16)}</Td>

                <Td>None</Td>

                <Td>
                  <div className="flex gap-1">
                    {filledArrayFromNumber(5).map((item, index) => (
                      <RatingStar key={index} />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {filledArrayFromNumber(5 - 5).map((item, index) => (
                      <YellowStar key={index} />
                    ))}
                  </div>
                </Td>

                {/* Actions */}
                <Td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                      fill="#555555"
                    />
                  </svg>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableOverflow>
      <Paginator />
    </TableCard>
  );
};

export default ContractorsTable;
