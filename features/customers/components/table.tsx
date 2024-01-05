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
import FilterBox from "./filter-box";
import {
  findLargestYear,
  findSmallestYear,
} from "@/lib/utils/get-min-or-max-date";
import { generateRange } from "@/lib/utils/generate-range";

const table_headings = [
  "Customer’s Name",
  "Date Joined",
  "Email Address",
  "Ratings",
  "Action",
];

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomersTable: React.FC<IProps> = ({ setLoading }) => {
  const [customers, setCustomers] = useState<ICustomers>();
  const [currentCustomers, setCurrentCustomers] = useState<ICustomers>();
  const [queryedCustomers, setQueryedCustomers] = useState<ICustomers>();
  const [isQuerying, setIsQuerying] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getCustomerDetail().then((response) => {
      setLoading(false);
      setCustomers(response);
    });
  }, []);

  useEffect(() => {
    if (!isQuerying) {
      setCurrentCustomers(customers);
    } else {
      setCurrentCustomers(queryedCustomers);
    }
  }, [isQuerying, customers, queryedCustomers]);

  const dispatch = useAppDispatch();

  const handleViewACustomer = (item: ICustomerData) => {
    dispatch(setSingleCustomersDetail(item));
    router.push(`${pathname}/${item._id}`);
  };

  const handleQuery = (value: string) => {
    value === "" ? setIsQuerying(false) : setIsQuerying(true);
    console.log("");
    if (customers) {
      const filterArray = customers.customers.filter(
        (item) =>
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.fullName.toLowerCase().includes(value.toLowerCase())
      );

      setQueryedCustomers({ customers: filterArray });

      filterArray.length === 0 ? setNotFound(true) : setNotFound(false);
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([0]);

  useEffect(() => {
    if (customers) {
      const smallestDate = findSmallestYear(customers.customers);
      const largestDate = findLargestYear(customers.customers);
      setAvailableYears(generateRange(smallestDate, largestDate));
    }
  }, [currentCustomers]);

  const handleRatingFiltering = (value: number) => {
    console.log(value);
  };

  const [filterYear, setFilterYear] = useState(0);
  const [filterMonth, setFilterMonth] = useState(0);

  const handleYearFiltering = (value: number) => {
    console.log(value);
    setFilterYear(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterMonth !== 0) {
      if (customers) {
        const customersMatchingYear = customers.customers.filter((customer) => {
          const createdAtDate = new Date(customer.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          const createdAtMonth = createdAtDate.getMonth() + 1;
          return createdAtYear === value && createdAtMonth === filterMonth;
        });
        setQueryedCustomers({ customers: customersMatchingYear });
      }
    } else {
      if (customers) {
        const customersMatchingYear = customers.customers.filter((customer) => {
          const createdAtDate = new Date(customer.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          return createdAtYear === value;
        });
        setQueryedCustomers({ customers: customersMatchingYear });
      }
    }
  };

  const handleMonthFiltering = (value: number) => {
    console.log(value);
    setFilterMonth(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterYear !== 0) {
      if (customers) {
        const customersMatchingMonth = customers.customers.filter(
          (customer) => {
            const createdAtDate = new Date(customer.createdAt);
            const createdAtYear = createdAtDate.getFullYear();
            const createdAtMonth = createdAtDate.getMonth() + 1;
            console.log(createdAtMonth);
            return createdAtMonth === value && createdAtYear === filterYear;
          }
        );
        setQueryedCustomers({ customers: customersMatchingMonth });
      }
    } else {
      if (customers) {
        const customersMatchingMonth = customers.customers.filter(
          (customer) => {
            const createdAtDate = new Date(customer.createdAt);
            const createdAtMonth = createdAtDate.getMonth() + 1;
            console.log(createdAtMonth);
            return createdAtMonth === value;
          }
        );
        setQueryedCustomers({ customers: customersMatchingMonth });
      }
    }
  };

  return (
    <TableCard>
      <div className="flex items-center justify-between w-full">
        <Heading name="Customers’ list" />
        <div className="flex gap-8">
          <Searchbar
            placeholder="Search by name or email"
            handleQuery={handleQuery}
            notFound={notFound}
          />
          <Filter showFilters={showFilters} setShowFilters={setShowFilters}>
            <FilterBox
              handleRatingFiltering={handleRatingFiltering}
              handleMonthFiltering={handleMonthFiltering}
              handleYearFiltering={handleYearFiltering}
              availableYears={availableYears}
              setShowFilters={setShowFilters}
            />
          </Filter>
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
            {currentCustomers?.customers?.map((item, index) => (
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
