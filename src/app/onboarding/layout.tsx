import AuthWrapper from "@/components/auth/AuthWrapper";

export default async function Onboardinglayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
