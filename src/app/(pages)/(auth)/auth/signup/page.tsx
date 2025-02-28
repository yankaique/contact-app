'use server';
import { SignUpPage } from '@/components';
import { isNotAuthenticated } from '@/lib';

export default async function SignUp() {
  await isNotAuthenticated();
  return <SignUpPage />;
}
