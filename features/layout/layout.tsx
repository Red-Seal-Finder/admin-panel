"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { redirect } from "next/navigation";
import LoadingTemplate from "./loading";
import { getContactorDetail, getCustomerDetail } from "@/lib/api/api";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setTotalContractors,
  setTotalCustomers,
} from "@/lib/redux/slices/overview-data";
import { RootState } from "@/lib/redux/store";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const totalCustomers = useAppSelector(
    (state: RootState) => state.overviewTotal.totalCustomers
  );

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

  if (!authenticated && totalCustomers === "") {
    return <LoadingTemplate />;
  }

  return <LayoutElement>{children}</LayoutElement>;
};

export default Layout;

export const LayoutElement: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      <div className="bg-[#F0F0F0] min-w-[calc(100vw-280px)] w-[calc(100vw-21%)] max-h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};
