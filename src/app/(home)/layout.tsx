import AuthWrapper from "@/components/auth/AuthWrapper";
import { MenuBar } from "@/components/theme/menu-bar";
import React from "react";
import { checkOnboardingStatus } from "@/app/actions/category/user-category";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const status = await checkOnboardingStatus();
   if (!status.onboarded) {
    redirect("/onboarding");
  }
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background flex flex-col items-center sm:p-0 lg:p-2">
        <MenuBar />
        <div className=" w-full lg:max-w-7xl rounded-md p-0 lg:p-2 h-full">
          {children}
        </div>
      </div>
    </AuthWrapper>
  );
}
