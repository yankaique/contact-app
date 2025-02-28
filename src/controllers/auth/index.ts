import { signIn, signInWithPassword, signOut, signUp } from '@/server/auth';
import { toasterColorError } from '@/utils/toasterColor';
import { toast } from 'sonner';
import { create } from 'zustand';
import { LoginType, RegisterType } from './types';
import { redirect } from 'next/navigation';

interface AuthStore {
  isLoading: boolean;
  login: ({ email, password }: LoginType) => Promise<void>;
  loginWithoutPassword: (email: string) => Promise<void>;
  register: (data: RegisterType) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  login: async ({ email, password }) => {
    set({ isLoading: true });
    const createdSignIn = await signIn({
      data: {
        email,
        password,
      },
    });
    if (createdSignIn?.error) {
      toast(createdSignIn?.error, toasterColorError);
    } else {
      redirect('/auth/verify-email');
    }
    set({ isLoading: false });
  },
  register: async (data: RegisterType) => {
    set({ isLoading: true });
    const createdSignUp = await signUp({ data });
    if (createdSignUp?.error) {
      toast(createdSignUp?.error, toasterColorError);
    } else {
      redirect('/auth/verify-email');
    }
    set({ isLoading: false });
  },
  logout: async () => {
    await signOut();
    redirect('/auth/signin');
  },
  loginWithoutPassword: async (email: string) => {
    set({ isLoading: true });
    const createdSignIn = await signInWithPassword({
      data: {
        email,
      },
    });
    if (createdSignIn?.error) {
      toast(createdSignIn?.error, toasterColorError);
    } else {
      redirect('/auth/verify-email');
    }
    set({ isLoading: false });
  },
}));
