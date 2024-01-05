"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { redirect } from "next/navigation";
import LoadingTemplate from "./loading";
import { getCustomerDetail } from "@/lib/api/api";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      getCustomerDetail().then((response) => {
        if (!response) {
          setAuthenticated(true);
        } else {
          setAuthenticated(true);
        }
      });
    } else {
      redirect("/auth/login");
    }
  }, []);

  if (!authenticated) {
    return <LoadingTemplate />;
  }

  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      <div className="bg-[#F0F0F0] min-w-[calc(100vw-280px)] w-[calc(100vw-21%)]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
