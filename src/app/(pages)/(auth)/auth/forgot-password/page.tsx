'use server';
import { ForgotPasswordPage } from '@/components';
import { isNotAuthenticated } from '@/lib';

export default async function ForgotPassword() {
  await isNotAuthenticated();
  return <ForgotPasswordPage />;
}
