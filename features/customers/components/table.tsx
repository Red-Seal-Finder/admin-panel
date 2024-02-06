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
  findCustomersLargestYear,
  findCustomersSmallestYear,
} from "@/lib/utils/get-min-or-max-date";
import { generateRange } from "@/lib/utils/generate-range";

const table_headings = [
  "Customer’s Name",
  "Date Joined",
  "Email Address",
  "Phone Number",
  "Ratings",
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
      console.log(response);
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
    router.push(`${pathname}/${item.customer._id}`);
  };

  const handleQuery = (value: string) => {
    value === "" ? setIsQuerying(false) : setIsQuerying(true);
    if (customers) {
      const filterArray = customers.customers.filter(
        (item) =>
          item.customer.email.toLowerCase().includes(value.toLowerCase()) ||
          item.customer.fullName.toLowerCase().includes(value.toLowerCase())
      );

      setQueryedCustomers({ customers: filterArray });

      filterArray.length === 0 ? setNotFound(true) : setNotFound(false);
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([0]);

  useEffect(() => {
    if (customers) {
      const smallestDate = findCustomersSmallestYear(customers.customers);
      const largestDate = findCustomersLargestYear(customers.customers);
      setAvailableYears(generateRange(smallestDate, largestDate));
    }
  }, [currentCustomers]);

  const handleRatingFiltering = (value: number) => {};

  const [filterYear, setFilterYear] = useState(0);
  const [filterMonth, setFilterMonth] = useState(0);

  const handleYearFiltering = (value: number) => {
    setFilterYear(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterMonth !== 0) {
      if (customers) {
        const customersMatchingYear = customers.customers.filter((customer) => {
          const createdAtDate = new Date(customer.customer.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          const createdAtMonth = createdAtDate.getMonth() + 1;
          return createdAtYear === value && createdAtMonth === filterMonth;
        });
        setQueryedCustomers({ customers: customersMatchingYear });
      }
    } else {
      if (customers) {
        const customersMatchingYear = customers.customers.filter((customer) => {
          const createdAtDate = new Date(customer.customer.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          return createdAtYear === value;
        });
        setQueryedCustomers({ customers: customersMatchingYear });
      }
    }
  };

  const handleMonthFiltering = (value: number) => {
    setFilterMonth(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterYear !== 0) {
      if (customers) {
        const customersMatchingMonth = customers.customers.filter(
          (customer) => {
            const createdAtDate = new Date(customer.customer.createdAt);
            const createdAtYear = createdAtDate.getFullYear();
            const createdAtMonth = createdAtDate.getMonth() + 1;
            return createdAtMonth === value && createdAtYear === filterYear;
          }
        );
        setQueryedCustomers({ customers: customersMatchingMonth });
      }
    } else {
      if (customers) {
        const customersMatchingMonth = customers.customers.filter(
          (customer) => {
            const createdAtDate = new Date(customer.customer.createdAt);
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
                <Td>{item.customer.fullName}</Td>
                <Td>{formatDateToDDMMYY(item.customer.createdAt)}</Td>
                <Td>{item.customer.email}</Td>
                <Td>{item.customer.phoneNumber}</Td>

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
              </tr>
            ))}
          </tbody>
        </Table>
      </TableOverflow>
      {/* <Paginator /> */}
    </TableCard>
  );
};

export default CustomersTable;
