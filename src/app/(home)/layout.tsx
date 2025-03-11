
import { MenuBar } from "@/components/theme/menu-bar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
 
  return (
      <div className="min-h-screen bg-background flex flex-col items-center sm:p-0 lg:p-2">
        <MenuBar />
        <div className=" w-full lg:max-w-7xl rounded-md p-0 lg:p-2 h-full">
          {children}
        </div>
      </div>
  );
}
