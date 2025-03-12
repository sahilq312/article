import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function POST() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: 'User has no email address' }, { status: 400 });
    }
    
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
    
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (existingUser.length === 0) {
      await db.insert(users).values({
        email: email,
        name: name,
        selectedCategories: [], 
        clerkId: user.id,
        onboarding: false
      });
      
      return NextResponse.json({ success: true, action: 'created' });
    } else {
      await db.update(users)
        .set({ name })
        .where(eq(users.email, email));
      
      return NextResponse.json({ success: true, action: 'updated' });
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}