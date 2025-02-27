import { z } from 'zod';

export const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});
