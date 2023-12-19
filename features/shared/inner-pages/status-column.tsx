import { ComplaintsState, CompletedState, PendingState } from "@/public/svg";
import React from "react";

interface IProps {
  name: string;
  status: string;
}

const StatusColumn: React.FC<IProps> = ({ name, status }) => {
  return (
    <tr className="border-b border-b-[#ddd]">
      <td className="text-sm font-[500] text-[#777] py-4">{name}</td>
      <td className="font-[500] text-[15px] py-4">
        <div className="flex gap-[6px] items-center">
          <span>
            {status === "Completed" ? (
              <CompletedState />
            ) : status === "Complaints" ? (
              <ComplaintsState />
            ) : (
              <PendingState />
            )}
          </span>
          <p
            className={`${
              status === "Completed"
                ? "text-success"
                : status === "Complaints"
                ? "text-danger"
                : "text-inProcess"
            }`}
          >
            {status}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default StatusColumn;
