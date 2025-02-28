'use server';
import { VerifyEmailPage } from '@/components';
import { isNotAuthenticated } from '@/lib';

export default async function VerifyEmail() {
  await isNotAuthenticated();
  return <VerifyEmailPage />;
}
