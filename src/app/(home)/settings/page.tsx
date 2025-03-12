import { checkOnboardingStatus } from "@/app/actions/category/user-category";
import ChangePrefernce from "@/components/settings/change-preference";
import React from "react";

const SettingPage = async() => {
  const { selectedCategories } = await checkOnboardingStatus();
  return (
    <div className="flex border border-dashed min-h-[85vh] ">
      <ChangePrefernce userTopic={ selectedCategories }  />
    </div>
  );
};

export default SettingPage;
