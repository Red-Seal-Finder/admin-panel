import { RatingStar, YellowStar } from "@/public/svg";
import Image from "next/image";
import React from "react";
import { filledArrayFromNumber } from "@/lib/utils/array-from-number";

interface IProps {
  position: string;
  name: string;
  phoneNumber: string;
  stars: number;
  imageSrc: string;
  job?: string;
}

const ProfileColumn: React.FC<IProps> = ({
  position,
  name,
  phoneNumber,
  stars,
  imageSrc,
  job,
}) => {
  return (
    <tr className="border-b border-b-[#ddd]">
      <td className="text-sm font-[500] text-[#777] py-4 capitalize">
        {position}
      </td>

      <td className="py-4">
        <div className="flex gap-x-6 items-center ">
          <Image
            src={imageSrc}
            alt={name}
            width={60}
            height={60}
            className="w-[40px] h-[40px] object-cover rounded-[50%]"
          />

          <div className="flex flex-col gap-y-2">
            <p className="font-[600] capitalize">{name}</p>
            <p className="font-[500] text-[15px]">{phoneNumber}</p>
            <div className="flex gap-x-1">
              {filledArrayFromNumber(stars)?.map((star, index) => (
                <YellowStar key={index} />
              ))}
              {filledArrayFromNumber(5 - stars)?.map((star, index) => (
                <RatingStar key={index} />
              ))}
            </div>
            <p className="font-[500] text-[15px]">{job}</p>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default ProfileColumn;
