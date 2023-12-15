import React from "react";
import Sidebar from "./sidebar";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="bg-[#F0F0F0] min-w-[calc(100vw-280px)] w-[calc(100vw-21%)]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
