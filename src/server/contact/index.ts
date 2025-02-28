'use server';
import prisma from '@/lib/db';
import { auth, getGeolocation } from '@/lib';
import { CreateContactType, DeleteContactType } from './interfaces';
import { redirect } from 'next/navigation';
import { Contact, User } from '@prisma/client';

export const createContact = async ({ data }: { data: CreateContactType }) => {
  const session = await auth();
  const user = session?.user as User | undefined;
  if (!user) redirect('/auth/signin');
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        userId: user.id,
        OR: [{ cpf: data.cpf }, { cellphone: data.cellphone }],
      },
    });

    if (contact) return { error: 'O contato já está cadastrado.' };
    const isActualUser =
      user.cpf === data.cpf || user.cellphone === data.cellphone;
    if (isActualUser)
      return { error: 'Este usuário não pode ser adicionado aos contatos.' };
    const response = await getGeolocation({
      address: data.address,
      city: data.city,
      uf: data.uf,
      neighborhood: data.neighborhood,
      number: data.number ?? '',
    });
    if ('error' in response) return { error: response.error };
    await prisma.contact.create({
      data: {
        name: data.name,
        cellphone: data.cellphone,
        cpf: data.cpf,
        uf: data.uf,
        city: data.city,
        neighborhood: data.neighborhood,
        address: data.address,
        zipcode: data.zipcode,
        number: data.number,
        complement: data.complement,
        lat: String(response.lat),
        long: String(response.lng),
        userId: user.id,
      },
    });
    return { success: 'Contato criado com sucesso.' };
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};

export const deleteContact = async ({ data }: { data: DeleteContactType }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect('/auth/signin');
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        userId: user.id,
        id: data.contactId,
      },
    });
    if (!contact) return { error: 'O contato não foi encontrado.' };
    await prisma.contact.delete({
      where: {
        id: data.contactId,
      },
    });
    return { success: 'Contato excluído com sucesso.' };
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};

export const getContacts = async (): Promise<Contact[] | { error: string }> => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect('/auth/signin');
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: user.id,
      },
    });
    if (!contacts) return { error: 'Os contatos não foram encontrados.' };
    return contacts;
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};

export const getContact = async (
  contactId: string,
): Promise<Contact | { error: string }> => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect('/auth/signin');
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        userId: user.id,
        id: contactId,
      },
    });
    if (!contact) return { error: 'O contato não foi encontrado.' };
    return contact;
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};
