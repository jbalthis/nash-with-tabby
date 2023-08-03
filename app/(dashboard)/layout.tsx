import React from "react";

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full pb-10">
      <div
        className="
          hidden
          h-full
          md:flex
          md:flex-col
          md:fixed
          md:w-72
          md:inset-y-0
          z-[80]
          bg-gray-900
        "
      >
        <Sidebar apiLimitCount={0} isPro={true} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
