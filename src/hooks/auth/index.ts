import { signIn, signUp } from '@/server/auth';
import { toasterColorError, toasterColorSuccess } from '@/utils/toasterColor';
import { toast } from 'sonner';
import { create } from 'zustand';
import { LoginType, RegisterType } from './types';

interface AuthStore {
  isLoading: boolean;
  login: ({ email, password }: LoginType) => Promise<void>;
  register: (data: RegisterType) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const createdSignIn = await signIn({
        data: {
          email,
          password,
        },
      });
      if (createdSignIn?.error) {
        toast(createdSignIn?.error, toasterColorError);
      } else {
        toast('Login realizado com sucesso!', toasterColorSuccess);
      }
    } catch {
      toast('Ocorreu um erro, tente novamente mais tarde.', toasterColorError);
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (data: RegisterType) => {
    set({ isLoading: true });
    try {
      const createdSignUp = await signUp({ data });
      if (createdSignUp?.error) {
        toast(createdSignUp?.error, toasterColorError);
      } else {
        toast('Conta criada com sucesso!', toasterColorSuccess);
      }
    } catch {
      toast('Ocorreu um erro, tente novamente mais tarde.', toasterColorError);
    } finally {
      set({ isLoading: false });
    }
  },
}));
