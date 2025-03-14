import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OnboardingPage from "./onboarding-component";
import { checkOnboardingStatus } from "../actions/category/user-category";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const { onboarded } = await checkOnboardingStatus();
  if (onboarded) {
    redirect("/article")
  }
  return <OnboardingPage />;
};

export default page;
