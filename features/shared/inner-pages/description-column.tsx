import React from "react";

interface IProps {
  name: string;
  text: string;
}

const DescriptionColumn: React.FC<IProps> = ({ name, text }) => {
  return (
    <tr className="border-b border-b-[#ddd]">
      <td className="text-sm font-[500] text-[#777] py-4">{name}</td>
      <td className="font-[400] text-[15px] py-4 max-w-[500px] whitespace-break-spaces ">
        {text}
      </td>
    </tr>
  );
};

export default DescriptionColumn;
