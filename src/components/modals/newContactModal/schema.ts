import { z } from 'zod';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;

export const schema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cpf: z
    .string()
    .min(14, 'CPF inválido')
    .refine((cpf) => cpfRegex.test(cpf.replace(/[^\d]/g, '')), {
      message: 'CPF inválido. Formato esperado: XXX.XXX.XXX-XX',
    }),
  cellphone: z.string().min(15, 'Número de telefone inválido'),
  uf: z.string().min(2, 'UF inválida'),
  city: z.string().min(3, 'Cidade inválida'),
  neighborhood: z.string().min(3, 'Bairro inválido'),
  address: z.string().min(3, 'O endereço deve ter pelo menos 3 caracteres'),
  zipcode: z.string().min(8, 'CEP inválido'),
  number: z.string().optional(),
  complement: z.string().optional(),
});
