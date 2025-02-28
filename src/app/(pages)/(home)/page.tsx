'use server';
import { HomePage } from '@/components';
import { isNotAuthenticated } from '@/lib';
export default async function Home() {
  await isNotAuthenticated();
  return <HomePage />;
}
