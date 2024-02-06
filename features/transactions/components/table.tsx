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
import { ITransactionsDetail, ITransactionsDetails } from "@/lib/types";
import { getTransactionDetail } from "@/lib/api/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  findTransactionDetailsLargestYear,
  findTransactionDetailsSmallestYear,
} from "@/lib/utils/get-min-or-max-date";
import { generateRange } from "@/lib/utils/generate-range";
import { trimString } from "@/lib/utils/trim-string";
import { formatDateToDDMMYY } from "@/lib/utils/format-date";
import FilterBox from "@/features/customers/components/filter-box";
import { setSingleTranactionsDetail } from "@/lib/redux/slices/single-transaction";

// Since the table data is dynamic a table component will replace by this template
// This Template defines how you can implement any table on your page

const table_headings = [
  "Contractor’s Name",
  "Invoice ID",
  "Customer name",
  "Job address",
  "Payment date",
  "Amount",
  "Status",
];

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionsDetailsTable: React.FC<IProps> = ({ setLoading }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [transactionsDetails, setTransactionsDetails] =
    useState<ITransactionsDetails>();
  const [currentTransactionsDetails, setCurrentTransactionsDetails] =
    useState<ITransactionsDetails>();
  const [queryedTransactionsDetails, setQueryedTransactionsDetails] =
    useState<ITransactionsDetails>();
  const [isQuerying, setIsQuerying] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const data = {
      page: 1,
      limit: 50,
    };

    getTransactionDetail(data).then((response: ITransactionsDetails) => {
      setLoading(false);
      setTransactionsDetails(response);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    if (!isQuerying) {
      setCurrentTransactionsDetails(transactionsDetails);
    } else {
      setCurrentTransactionsDetails(queryedTransactionsDetails);
    }
  }, [isQuerying, transactionsDetails, queryedTransactionsDetails]);

  const dispatch = useAppDispatch();

  const handleQuery = (value: string) => {
    value === "" ? setIsQuerying(false) : setIsQuerying(true);

    if (transactionsDetails) {
      const filterArray = transactionsDetails.transactionDetail.filter((item) =>
        item.from.fullName.toLowerCase().includes(value.toLowerCase())
      );

      setQueryedTransactionsDetails({ transactionDetail: filterArray });

      filterArray.length === 0 ? setNotFound(true) : setNotFound(false);
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([0]);

  useEffect(() => {
    console.log(transactionsDetails);
    if (transactionsDetails) {
      const smallestDate = findTransactionDetailsSmallestYear(
        transactionsDetails.transactionDetail
      );
      const largestDate = findTransactionDetailsLargestYear(
        transactionsDetails.transactionDetail
      );
      setAvailableYears(generateRange(smallestDate, largestDate));
    }
  }, [currentTransactionsDetails]);

  const [filterYear, setFilterYear] = useState(0);
  const [filterMonth, setFilterMonth] = useState(0);

  const handleYearFiltering = (value: number) => {
    setFilterYear(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterMonth !== 0) {
      if (transactionsDetails) {
        const transactionsDetailsMatchingYear =
          transactionsDetails.transactionDetail.filter((detail) => {
            const createdAtDate = new Date(detail.transaction.createdAt);
            const createdAtYear = createdAtDate.getFullYear();
            const createdAtMonth = createdAtDate.getMonth() + 1;
            return createdAtYear === value && createdAtMonth === filterMonth;
          });
        setQueryedTransactionsDetails({
          transactionDetail: transactionsDetailsMatchingYear,
        });
      }
    } else {
      if (transactionsDetails) {
        const transactionsDetailsMatchingYear =
          transactionsDetails.transactionDetail.filter((detail) => {
            const createdAtDate = new Date(detail.transaction.createdAt);
            const createdAtYear = createdAtDate.getFullYear();
            return createdAtYear === value;
          });
        setQueryedTransactionsDetails({
          transactionDetail: transactionsDetailsMatchingYear,
        });
      }
    }
  };

  const handleMonthFiltering = (value: number) => {
    setFilterMonth(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterYear !== 0) {
      if (transactionsDetails) {
        const transactionsDetailsMatchingMonth =
          transactionsDetails.transactionDetail.filter((detail) => {
            const createdAtDate = new Date(detail.transaction.createdAt);
            const createdAtYear = createdAtDate.getFullYear();
            const createdAtMonth = createdAtDate.getMonth() + 1;
            return createdAtMonth === value && createdAtYear === filterYear;
          });
        setQueryedTransactionsDetails({
          transactionDetail: transactionsDetailsMatchingMonth,
        });
      }
    } else {
      if (transactionsDetails) {
        const transactionsDetailsMatchingMonth =
          transactionsDetails.transactionDetail.filter((detail) => {
            const createdAtDate = new Date(detail.transaction.createdAt);
            const createdAtMonth = createdAtDate.getMonth() + 1;
            console.log(createdAtMonth);
            return createdAtMonth === value;
          });
        setQueryedTransactionsDetails({
          transactionDetail: transactionsDetailsMatchingMonth,
        });
      }
    }
  };

  const handleRatingFiltering = (value: number) => {
    console.log(value);
  };

  const handleViewATransaction = (item: ITransactionsDetail) => {
    dispatch(setSingleTranactionsDetail(item));
    router.push(`${pathname}/${item.transaction._id}`);
  };
  return (
    <TableCard>
      <div className="flex items-center justify-between w-full">
        <Heading name="Transactions List" />
        <div className="flex gap-8">
          <Searchbar
            placeholder="Search for a name"
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
            {currentTransactionsDetails?.transactionDetail?.map(
              (item, index) => (
                <tr
                  key={index}
                  onClick={() => handleViewATransaction(item)}
                  className="cursor-pointer"
                >
                  <Td>Incoming</Td>
                  <Td>{item.transaction.invoiceId}</Td>
                  <Td>{trimString(item.from.fullName, 15)}</Td>
                  <Td>{trimString(item.job.address, 20)}</Td>
                  <Td>{formatDateToDDMMYY(item.transaction.createdAt)}</Td>
                  <Td>${item.transaction.amount}</Td>
                  <Td>{trimString(item.job.status, 15)}</Td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </TableOverflow>
      {/* <Paginator /> */}
    </TableCard>
  );
};

export default TransactionsDetailsTable;
