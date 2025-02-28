import { toasterColorError } from '@/utils/toasterColor';
import { toast } from 'sonner';
import { create } from 'zustand';
import { getAddressByCep, getUfs } from '@/server/utils';
import { UfsType } from './types';

interface UtilsStore {
  isCepLoading: boolean;
  address: {
    logradouro: string;
    bairro: string;
    city: string;
    uf: string;
    complemento: string;
    neighborhood: string;
  } | null;
  ufs: UfsType[] | null;
  getAddressByCepController: (cep: string) => Promise<void>;
  getUfsController: () => Promise<void>;
}

export const useUtilsStore = create<UtilsStore>((set) => ({
  isCepLoading: false,
  address: null,
  ufs: null,
  getAddressByCepController: async (cep: string) => {
    set({ isCepLoading: true });
    const createdAddress = await getAddressByCep(cep);
    if (createdAddress?.error) {
      toast(createdAddress?.error, toasterColorError);
    } else {
      set({ address: createdAddress });
    }
    set({ isCepLoading: false });
  },
  getUfsController: async () => {
    set({ isCepLoading: true });
    const ufs = await getUfs();
    if (ufs?.error || !ufs) {
      toast(ufs?.error, toasterColorError);
    } else {
      const sortedUfs = ufs.sort((a: UfsType, b: UfsType) =>
        a.sigla.localeCompare(b.sigla),
      );
      set({ ufs: sortedUfs });
    }
    set({ isCepLoading: false });
  },
}));
