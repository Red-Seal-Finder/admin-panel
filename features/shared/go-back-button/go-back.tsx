"use client";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="font-[600] text-[#777]"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default GoBack;
