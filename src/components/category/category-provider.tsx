"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/category-store";
import { usePathname, useRouter } from "next/navigation";

export default function CategoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onboarding } = useCategoryStore();
  const pathname = usePathname();
  const router = useRouter();

  

  useEffect(() => {
    if (!onboarding && pathname !== "/onboarding") {
      router.push("/onboarding");
    }
  }, [onboarding, pathname, router, ]);


  return <>{children}</>;
}