'use server';
import prisma from '@/lib/db';
import {
  signIn as SignInService,
  signOut as SignOutService,
  hashPassword,
  verifyPassword,
} from '@/lib';
import { SignInData, SignInWithPasswordData, SignUpData } from './interfaces';
export const signUp = async ({ data }: { data: SignUpData }) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { cpf: data.cpf },
          { cellphone: data.cellphone },
        ],
      },
    });

    if (user) return { error: 'O usuário já existe.' };
    const encryptedPassword = await hashPassword(data.password);
    if (!encryptedPassword)
      return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: encryptedPassword,
        cpf: data.cpf,
        cellphone: data.cellphone,
        birthday: data.birthday,
      },
    });
    await SignInService('nodemailer', { email: data.email, redirect: false });
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};

export const signIn = async ({ data }: { data: SignInData }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return { error: 'Email ou senha incorreta.' };
    }
    const decryptedPassword = await verifyPassword({
      password: data.password,
      hashedPassword: user.password,
    });
    if (!decryptedPassword) {
      return { error: 'Email ou senha incorreta.' };
    }
    await SignInService('nodemailer', {
      email: data.email,
      password: user.password,
      redirect: false,
    });
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};

export const signOut = async () => {
  await SignOutService();
};

export const signInWithPassword = async ({
  data,
}: {
  data: SignInWithPasswordData;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return { error: 'Email incorreto.' };
    }
    await SignInService('nodemailer', {
      email: data.email,
      redirect: false,
    });
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};
