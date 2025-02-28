'use server';
import { SignInPage } from '@/components';
import { isNotAuthenticated } from '@/lib';

export default async function SignIn() {
  await isNotAuthenticated();
  return <SignInPage />;
}
