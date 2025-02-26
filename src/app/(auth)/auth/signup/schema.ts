import { z } from 'zod';
import { differenceInYears, parse } from 'date-fns';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;

export const schema = z
  .object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    cpf: z
      .string()
      .min(14, 'CPF inválido')
      .refine((cpf) => cpfRegex.test(cpf.replace(/[^\d]/g, '')), {
        message: 'CPF inválido. Formato esperado: XXX.XXX.XXX-XX',
      }),
    cellphone: z.string().min(15, 'Número de telefone inválido'),
    birthday: z
      .string()
      .min(10, 'Data inválida')
      .refine(
        (date) => {
          const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
          return differenceInYears(new Date(), parsedDate) >= 18;
        },
        { message: 'Você deve ter pelo menos 18 anos' },
      ),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .refine((password) => /[A-Z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra maiúscula',
      })
      .refine((password) => /\d/.test(password), {
        message: 'A senha deve conter pelo menos um número',
      })
      .refine((password) => /[\W_]/.test(password), {
        message: 'A senha deve conter pelo menos um caractere especial',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
