import React from "react";

interface IProps {
  actionName: string;
  onClick: () => void;
}

const ActionButton: React.FC<IProps> = ({ onClick, actionName }) => {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`text-xs border border-green-600 text-green-600 font-[600] px-6 py-1 rounded-[20px] outline-none hover:opacity-80`}
      >
        {actionName}
      </button>
    </>
  );
};

export default ActionButton;
