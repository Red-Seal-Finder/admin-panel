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
import { RatingStar } from "@/public/svg";
import { usePathname, useRouter } from "next/navigation";
import { ICustomerData, ICustomers } from "@/lib/types";
import { formatDateToDDMMYY } from "@/lib/utils/format-date";
import { getCustomerDetail } from "@/lib/api/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setSingleCustomersDetail } from "@/lib/redux/slices/single-customer";

const table_headings = [
  "Customer’s Name",
  "Date Joined",
  "Email Address",
  "Ratings",
  "Action",
];

const CustomersTable = () => {
  const [customers, setCustomers] = useState<ICustomers>();
  useEffect(() => {
    getCustomerDetail().then((response) => {
      setCustomers(response);
    });
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const handleViewACustomer = (item: ICustomerData) => {
    dispatch(setSingleCustomersDetail(item));
    router.push(`${pathname}/${item._id}`);
  };

  return (
    <TableCard>
      <div className="flex items-center justify-between w-full">
        <Heading name="Customers’ list" />
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
            {customers?.customers?.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleViewACustomer(item)}
                className="cursor-pointer"
              >
                <Td>{item.fullName}</Td>
                <Td>{formatDateToDDMMYY(item.createdAt)}</Td>
                <Td>{item.email}</Td>

                {/* Rating */}
                <Td>
                  <div className="flex gap-1">
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
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

export default CustomersTable;
