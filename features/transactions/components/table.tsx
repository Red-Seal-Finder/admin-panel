// "use client";
// import React, { useEffect, useState } from "react";
// import TableCard from "@/features/shared/table/components/table-card";
// import Heading from "@/features/shared/table/components/table-heading";
// import Searchbar from "@/features/shared/table/components/searchbar";
// import Filter from "@/features/shared/table/components/filter";
// import Paginator from "@/features/shared/table/components/paginator";
// import TableOverflow from "@/features/shared/table/components/table-overflow";
// import Table from "@/features/shared/table/components/table";
// import Thead from "@/features/shared/table/components/thead";
// import Th from "@/features/shared/table/components/th";
// import Td from "@/features/shared/table/components/td";
// import {
//   ComplaintsState,
//   CompletedState,
//   PendingState,
//   YellowStar,
// } from "@/public/svg";
// import { usePathname, useRouter } from "next/navigation";
// import { ITransactionsDetails } from "@/lib/types";
// import { getTransactionDetail } from "@/lib/api/api";
// import { useAppDispatch } from "@/lib/redux/hooks";
// import { findTransactionDetailsLargestYear, findTransactionDetailsSmallestYear } from "@/lib/utils/get-min-or-max-date";
// import { generateRange } from "@/lib/utils/generate-range";

// // Since the table data is dynamic a table component will replace by this template
// // This Template defines how you can implement any table on your page

// const table_headings = [
//   "Contractor’s Name",
//   "Invoice ID",
//   "Customer name",
//   "Job address",
//   "Payment date",
//   "Amount",
//   "Status",
//   "Action",
// ];

// interface IProps {
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const CustomersTable: React.FC<IProps> = ({ setLoading }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [transactionsDetails, setTransactionsDetails] = useState<ITransactionsDetails>();
//   const [currentTransactionsDetails, setCurrentTransactionsDetails] = useState<ITransactionsDetails>();
//   const [queryedTransactionsDetails, setQueryedTransactionsDetails] = useState<ITransactionsDetails>();
//   const [isQuerying, setIsQuerying] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     const data = {
//       page: 1,
//       limit: 50,
//     };

//     getTransactionDetail(data).then((response: ITransactionsDetails) => {
//       setLoading(false);
//       setTransactionsDetails(response);
//     });
//   }, []);

//   useEffect(() => {
//     if (!isQuerying) {
//       setCurrentTransactionsDetails(transactionsDetails);
//     } else {
//       setCurrentTransactionsDetails(queryedTransactionsDetails);
//     }
//   }, [isQuerying, transactionsDetails, queryedTransactionsDetails]);

//   const dispatch = useAppDispatch();
//   // const handleViewATransactionsDetails = (item: ITransactionsDetailsDetails) => {
//   //   dispatch(setsingleTransactionsDetailsDetail(item));
//   //   router.push(`${pathname}/${item.contractorProfile._id}`);
//   // };

//   const handleQuery = (value: string) => {
//     value === "" ? setIsQuerying(false) : setIsQuerying(true);

//     if (transactionsDetails) {
//       const filterArray = transactionsDetails.transactionDetails.filter(
//         (item) =>
//           item.contractorProfile.email
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           item.contractorProfile.firstName
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           item.contractorProfile.lastName
//             .toLowerCase()
//             .includes(value.toLowerCase())
//       );

//       setQueryedTransactionsDetails({ transactionDetails: filterArray });

//       filterArray.length === 0 ? setNotFound(true) : setNotFound(false);
//     }
//   };

//   const [showFilters, setShowFilters] = useState(false);
//   const [availableYears, setAvailableYears] = useState<number[]>([0]);

//   useEffect(() => {
//     if (transactionsDetails) {
//       const smallestDate = findTransactionDetailsSmallestYear(transactionsDetails.transactionDetails);
//       const largestDate = findTransactionDetailsLargestYear(transactionsDetails.transactionDetails);
//       setAvailableYears(generateRange(smallestDate, largestDate));
//     }
//   }, [currentTransactionsDetails]);

//   const handleRatingFiltering = (value: number) => {
//     console.log(value);
//   };

//   const handleStatusFiltering = (value: number) => {
//     console.log(value);
//   };
//   return (
//     <TableCard>
//       <div className="flex items-center justify-between w-full">
//         <Heading name="TransactionsDetails’ list" />
//         <div className="flex gap-8">
//           <Searchbar
//             placeholder="Search"
//             notFound={true}
//             handleQuery={(value) => console.log("Functionality In Progress")}
//           />
//           <Filter />
//         </div>
//       </div>

//       <TableOverflow>
//         <Table>
//           <Thead>
//             <tr>
//               {table_headings?.map((heading, index) => (
//                 <Th key={index}>{heading}</Th>
//               ))}
//             </tr>
//           </Thead>

//           <tbody>

//           </tbody>
//         </Table>
//       </TableOverflow>
//       <Paginator />
//     </TableCard>
//   );
// };

// export default CustomersTable;
