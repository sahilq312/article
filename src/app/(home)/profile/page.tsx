//import { ThemeToggle } from '@/components/theme/toggle-button'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className='flex flex-col gap-4 min-w-full items-center justify-center'>
      {/* <ThemeToggle /> */}
      <UserProfile />
    </div>
  )
}

export default ProfilePage