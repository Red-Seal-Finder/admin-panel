"use client";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import {
  AccountSettings,
  Contractors,
  Customers,
  Customise,
  Jobs,
  Logout,
  Overview,
  RFReps,
  Transactions,
} from "@/public/svg";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  interface INavLinks {
    name: string;
    svg: React.ReactNode;
    route: string;
  }

  const navLinks: INavLinks[] = [
    { name: "Overview", svg: <Overview />, route: "/" },
    { name: "Jobs", svg: <Jobs />, route: "/jobs" },
    { name: "Customers", svg: <Customers />, route: "/customers" },
    { name: "Contractors", svg: <Contractors />, route: "/contractors" },
    { name: "Transactions", svg: <Transactions />, route: "/transactions" },
    { name: "RF Reps", svg: <RFReps />, route: "rf-reps" },
    { name: "Customise", svg: <Customise />, route: "/customise" },
    {
      name: "Account Settings",
      svg: <AccountSettings />,
      route: "account-settings",
    },
  ];
  return (
    <div
      className="max-w-[280px] w-[21%] min-w-[250px] bg-white border-r-[#ddd] border-r sticky top-0 
            overflow-y-auto scrollbar-thin"
    >
      <div className="flex flex-col gap-4">
        {/* Logo Container */}
        <div className="flex flex-col items-center py-10">
          <Image src={logo} alt="Logo" width={32} height={32} />
          <p className="text-sm">Repairfind</p>
        </div>

        {/* Navigation */}
        {navLinks.map((link) => (
          <button
            className={`flex gap-2 text-sm items-center  pl-14 py-3 transition-all duration-500 
          border-transparent outline-none hover:border-l-[4px] hover:border-l-[#333]/50 
          hover:bg-[#F1F1F1]/60 ${
            pathname === link.route &&
            "border-l-[6px] border-l-[#333] bg-[#F1F1F1]"
          }`}
            onClick={() => router.push(link.route)}
          >
            <span>{link.svg}</span>
            {link.name}
          </button>
        ))}

        <div className="mt-24 ">
          <button
            className={`flex gap-2 text-sm items-center  pl-14 py-3 transition-all duration-500 
          border-transparent outline-none hover:border-l-[4px] hover:border-l-[#333]/50 
          hover:bg-[#F1F1F1]/60`}
          >
            <span>
              <Logout />
            </span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
