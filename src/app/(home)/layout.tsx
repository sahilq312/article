import { MenuBar } from "@/components/theme/menu-bar";
import React from "react";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
          <MenuBar />
          <div className=" w-full max-w-7xl rounded-md p-4 h-full">
        {children}
          </div>
    </div>
  );
}
