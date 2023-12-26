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
import { usePathname, useRouter } from "next/navigation";
import { getSubAdmins } from "@/lib/api/api";
import { ISubAdmins } from "@/lib/types";
import { formatDateToDDMMYY } from "@/lib/utils/format-date";
import { AnimatePresence } from "framer-motion";
import Options from "../shared/actions/option";
import Action from "./action";

// Since the table data is dynamic a table component will replace by this template
// This Template defines how you can implement any table on your page

const table_headings = [
  "Sub Admin Name",
  "Date Joined",
  "Email Address",
  "Action",
];

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubAdminTable: React.FC<IProps> = ({ setLoading }) => {
  const [subAdmins, setSubAdmins] = useState<ISubAdmins>();

  useEffect(() => {
    getSubAdmins().then((response) => {
      console.log(response);
      setLoading(false);
      setSubAdmins(response);
    });
  }, []);

  return (
    <TableCard>
      <div className="flex items-center justify-between w-full">
        <Heading name="Sub Admins list" />
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
            {subAdmins?.admins.map((item, index) => (
              <tr key={index} className="cursor-pointer">
                <Td>{item.firstName + " " + item.lastName}</Td>
                <Td>{formatDateToDDMMYY(item.createdAt)}</Td>
                <Td>{item.email}</Td>

                {/* Actions */}
                <Td>
                  <Action setLoading={setLoading} id={item._id} />
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

export default SubAdminTable;
