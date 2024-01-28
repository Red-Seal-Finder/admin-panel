"use client";
import React, { useEffect, useState } from "react";
import TableCard from "@/features/shared/table/components/table-card";
import Heading from "@/features/shared/table/components/table-heading";
import Searchbar from "@/features/shared/table/components/searchbar";
import Filter from "@/features/shared/table/components/filter";
import TableOverflow from "@/features/shared/table/components/table-overflow";
import Table from "@/features/shared/table/components/table";
import Thead from "@/features/shared/table/components/thead";
import Th from "@/features/shared/table/components/th";
import Td from "@/features/shared/table/components/td";
import { useRouter } from "next/navigation";
import { getJobs } from "@/lib/api/api";
import { IJobsList } from "@/lib/types";
import { trimString } from "@/lib/utils/trim-string";
import { formatDateToDDMMYY } from "@/lib/utils/format-date";
import {
  findJobListSmallestYear,
  findJoblistLargestYear,
} from "@/lib/utils/get-min-or-max-date";
import { generateRange } from "@/lib/utils/generate-range";
import FilterBox from "@/features/customers/components/filter-box";

// Since the table data is dynamic a table component will replace by this template
// This Template defines how you can implement any table on your page

const table_headings = [
  "Customer’s Name",
  "Job ID",
  "Contractors’s Name",
  "Job Address",
  "Date",
  "Inspection",
  "Status",
];

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobsTable: React.FC<IProps> = ({ setLoading }) => {
  // const router = useRouter();
  const [jobsList, SetJobsList] = useState<IJobsList>();
  const [currentJobsList, setCurrentJobsList] = useState<IJobsList>();
  const [queryedJobsList, setQueryedJobsList] = useState<IJobsList>();
  const [isQuerying, setIsQuerying] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getJobs({ page: 1, limit: 50 }).then((response) => {
      SetJobsList(response?.response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isQuerying) {
      setCurrentJobsList(jobsList);
    } else {
      setCurrentJobsList(queryedJobsList);
    }
  }, [isQuerying, jobsList, queryedJobsList]);

  const handleQuery = (value: string) => {
    value === "" ? setIsQuerying(false) : setIsQuerying(true);
    if (jobsList) {
      const filterArray = jobsList.jobs.filter(
        (item) =>
          item.customer.fullName.toLowerCase().includes(value.toLowerCase()) ||
          item.contractor.firstName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.contractor.lastName.toLowerCase().includes(value.toLowerCase())
      );

      setQueryedJobsList({ jobs: filterArray });

      filterArray.length === 0 ? setNotFound(true) : setNotFound(false);
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([0]);

  useEffect(() => {
    if (jobsList) {
      const smallestDate = findJobListSmallestYear(jobsList.jobs);
      const largestDate = findJoblistLargestYear(jobsList.jobs);
      setAvailableYears(generateRange(smallestDate, largestDate));
    }
  }, [currentJobsList]);

  const handleRatingFiltering = (value: number) => {};

  const [filterYear, setFilterYear] = useState(0);
  const [filterMonth, setFilterMonth] = useState(0);

  const handleYearFiltering = (value: number) => {
    setFilterYear(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterMonth !== 0) {
      if (jobsList) {
        const jobsListMatchingYear = jobsList.jobs.filter((job) => {
          const createdAtDate = new Date(job.job.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          const createdAtMonth = createdAtDate.getMonth() + 1;
          return createdAtYear === value && createdAtMonth === filterMonth;
        });
        setQueryedJobsList({ jobs: jobsListMatchingYear });
      }
    } else {
      if (jobsList) {
        const jobsListMatchingYear = jobsList.jobs.filter((job) => {
          const createdAtDate = new Date(job.job.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          return createdAtYear === value;
        });
        setQueryedJobsList({ jobs: jobsListMatchingYear });
      }
    }
  };

  const handleMonthFiltering = (value: number) => {
    setFilterMonth(value);
    value === 0 ? setIsQuerying(false) : setIsQuerying(true);
    if (filterYear !== 0) {
      if (jobsList) {
        const jobsListMatchingMonth = jobsList.jobs.filter((job) => {
          const createdAtDate = new Date(job.job.createdAt);
          const createdAtYear = createdAtDate.getFullYear();
          const createdAtMonth = createdAtDate.getMonth() + 1;
          return createdAtMonth === value && createdAtYear === filterYear;
        });
        setQueryedJobsList({ jobs: jobsListMatchingMonth });
      }
    } else {
      if (jobsList) {
        const jobsListMatchingMonth = jobsList.jobs.filter((job) => {
          const createdAtDate = new Date(job.job.createdAt);
          const createdAtMonth = createdAtDate.getMonth() + 1;
          console.log(createdAtMonth);
          return createdAtMonth === value;
        });
        setQueryedJobsList({ jobs: jobsListMatchingMonth });
      }
    }
  };

  return (
    <TableCard>
      <div className="flex items-center justify-between w-full">
        <Heading name="Job List" />
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
            {currentJobsList?.jobs.map((item, index) => (
              <tr key={index}>
                <Td>{item?.customer.fullName}</Td>
                <Td>{trimString(item?.job._id, 8)}</Td>
                <Td>
                  {item.contractor.firstName} {item.contractor.lastName}
                </Td>
                <Td>{trimString(item.job.address, 25)}</Td>
                <Td>{formatDateToDDMMYY(item.job.createdAt)}</Td>
                <Td>{item.job.inspection.status ? "True" : "False"}</Td>
                <Td>{item.job.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableOverflow>
    </TableCard>
  );
};

export default JobsTable;
