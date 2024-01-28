import { LayoutElement } from "@/features/layout/layout";
import LoadingTemplate from "@/features/layout/loading";
import React from "react";

const LoadingPage = () => {
  return (
    <>
      <LayoutElement>
        <LoadingTemplate />
      </LayoutElement>
    </>
  );
};

export default LoadingPage;
