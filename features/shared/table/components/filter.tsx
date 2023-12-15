import { FilterIcon } from "@/public/svg";
import React from "react";

const Filter = () => {
  return (
    <div className="flex gap-9 bg-[#F1F1F1] p-2">
      <p className="whitespace-nowrap">Filter by</p>
      <FilterIcon />
    </div>
  );
};

export default Filter;
