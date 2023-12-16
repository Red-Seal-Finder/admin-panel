import React from "react";

const Paginator = () => {
  return (
    <div className="flex w-full justify-end mt-7 cursor-pointer">
      <div className="flex items-center gap-6 whitespace-nowrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10 2.66669L4.66669 8.00002L10 13.3334"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-sm">
          <span className="font-[600]">1 </span>
          of 2
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M5.99998 2.66669L11.3333 8.00002L5.99998 13.3334"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Paginator;
