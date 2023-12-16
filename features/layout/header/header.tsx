import { NotificationBell } from "@/public/svg";
import Image from "next/image";
import React from "react";
import pic from "@/public/admin-pic.png";

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = ({ children }) => {
  return (
    <div
      className="flex px-[3vw] pt-8 pb-6 justify-between border-b-[#ddd] border-b 
    items-center sticky top-[0px] gap-x-[200px] overflow-x-auto bg-[#F0F0F0] z-20"
    >
      {/* Name */}
      <p className="text-xl font-[500] whitespace-nowrap">
        Welcome, <span className="font-[600]">Raphael</span>
      </p>

      <div className="flex gap-7">
        {children}
        {/* Notification Bell */}
        <div className="bg-white flex justify-center items-center w-14 rounded">
          <NotificationBell />
        </div>
        {/* Admin Profile */}
        <div className="flex gap-3">
          <Image
            src={pic}
            alt="Admin Pic"
            width={40}
            height={40}
            className="w-10 h-10 "
          />
          <div className="">
            <select className="bg-transparent outline-none font-[500]">
              <option value="">Raphael Okoye</option>
            </select>
            <p className="font-[400] ml-1">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
