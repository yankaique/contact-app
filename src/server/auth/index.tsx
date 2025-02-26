'use server';

import { signIn as authSignIn } from '@/lib/auth';
import prisma from '@/lib/db';
import { encryptData } from '@/lib/encryption';
import { SignUpData } from './interfaces';

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
    const encryptedPassword = encryptData(data.password);
    if (!encryptedPassword)
      return { error: 'Ocorreu um erro, tente novamente mais tarde.' };

    console.log('data:', data);
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

    await authSignIn('nodemailer', { email: data.email, redirect: false });
  } catch (error) {
    console.error('Erro ao registrar:', error);
  }
};
