import { toasterColorError, toasterColorSuccess } from '@/utils/toasterColor';
import { toast } from 'sonner';
import { Contact } from '@prisma/client';
import { create } from 'zustand';
import { createContact, getContact, getContacts } from '@/server/contact';
import { CreateContactControllerType } from './types';

interface ContactStore {
  isContactLoading: boolean;
  contacts: Contact[] | null;
  contact: Contact | null;
  createContactController: (data: CreateContactControllerType) => Promise<void>;
  getContactsController: () => Promise<void>;
  getContactController: (contactId: string) => Promise<void>;
}

export const useContactsStore = create<ContactStore>((set, get) => ({
  isContactLoading: false,
  contacts: null,
  contact: null,
  createContactController: async (data: CreateContactControllerType) => {
    set({ isContactLoading: true });
    const createdContact = await createContact({
      data,
    });
    if (createdContact?.error) {
      toast(createdContact?.error, toasterColorError);
    } else {
      toast(createdContact?.success, toasterColorSuccess);
      await get().getContactsController();
    }
    set({ isContactLoading: false });
  },
  getContactsController: async () => {
    set({ isContactLoading: true });
    const createdContacts = await getContacts();

    if ('error' in createdContacts) {
      toast(createdContacts?.error, toasterColorError);
    } else {
      set({ contacts: createdContacts });
    }
    set({ isContactLoading: false });
  },
  getContactController: async (contactId: string) => {
    set({ isContactLoading: true });
    const createdContact = await getContact(contactId);

    if ('error' in createdContact) {
      toast(createdContact?.error, toasterColorError);
    } else {
      set({ contact: createdContact });
    }
    set({ isContactLoading: false });
  },
}));
