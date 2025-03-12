import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import OnboardingPage from './onboarding-component';
import AuthWrapper from '@/components/auth/AuthWrapper';

const page = async() => {
  const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in")
    }
  return (
      <AuthWrapper>
          <OnboardingPage/>
    </AuthWrapper>
  )
}

export default page