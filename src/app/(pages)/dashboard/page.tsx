'use server';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';
import { auth } from '@/lib';
import { DashboardPage } from '@/components';

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  return <DashboardPage data={session?.user as User} />;
}
