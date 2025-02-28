import { auth } from '@/lib';
import { redirect } from 'next/navigation';

export const isAuthenticated = async () => {
  const session = await auth();

  if (!session?.user) redirect('/auth/signin');

  return session;
};
