'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  
  useEffect(() => {
    async function syncUser() {
      if (isLoaded && isSignedIn) {
        try {
          await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('User synced successfully');
        } catch (error) {
          console.error('Failed to sync user:', error);
        }
      }
    }
    
    syncUser();
  }, [isLoaded, isSignedIn]);
  
  return <>{children}</>;
}