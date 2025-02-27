import { signIn } from '@/server/auth';
import { toasterColorError, toasterColorSuccess } from '@/utils/toasterColor';
import { toast } from 'sonner';
import { create } from 'zustand';

interface AuthStore {
  isLoading: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
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
        set({ isLoading: false });
      } else {
        toast('Login realizado com sucesso!', toasterColorSuccess);
      }
    } catch {
      set({ isLoading: false });
      toast('Ocorreu um erro, tente novamente mais tarde.', toasterColorError);
    }
  },
}));
