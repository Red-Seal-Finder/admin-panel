"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { redirect } from "next/navigation";
import LoadingTemplate from "./loading";
import { getContactorDetail, getCustomerDetail } from "@/lib/api/api";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  setTotalContractors,
  setTotalCustomers,
} from "@/lib/redux/slices/overview-data";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      getCustomerDetail().then((response) => {
        if (!response) {
          setAuthenticated(false);
          localStorage.removeItem("token");
        } else {
          dispatch(setTotalCustomers(response.customers.length));
          getTotalContractors();
          setAuthenticated(true);
        }
      });
    } else {
      redirect("/auth/login");
    }
  }, []);

  const getTotalContractors = () => {
    getContactorDetail({ page: 1, limit: 50 }).then((response) => {
      dispatch(setTotalContractors(response.artisans.length));
    });
  };

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
