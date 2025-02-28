'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { schema } from './schema';
import { formatCPF, formatPhone } from '@/utils/formatData';
import { useAuthStore } from '@/controllers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
} from '@/components';

export function SignUpPage() {
  const { register: signUp, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await signUp(data);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-background">
      <Card className={cn('w-[680px]')}>
        <CardHeader>
          <section>
            <CardTitle>Registrar</CardTitle>
            <CardDescription>
              Faça seu cadastro e adicione seus contatos.
            </CardDescription>
          </section>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Label htmlFor="name">Nome:</Label>
            <Input
              id="name"
              type="text"
              placeholder="João Rodrigues"
              className={cn({ 'border-destructive': errors.name })}
              maxLength={60}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-destructive">{errors.name.message}</p>
            )}
          </CardContent>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <section>
              <Label htmlFor="birthday">Data de aniversário:</Label>
              <Input
                id="birthday"
                type="date"
                className={cn({ 'border-destructive': errors.birthday })}
                {...register('birthday')}
              />
              {errors.birthday && (
                <p className="text-destructive">{errors.birthday.message}</p>
              )}
            </section>
            <section>
              <Label htmlFor="cpf">CPF:</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="999.999.999-99"
                className={cn({ 'border-destructive': errors.cpf })}
                maxLength={15}
                {...register('cpf')}
                onChange={(e) => setValue('cpf', formatCPF(e.target.value))}
              />
              {errors.cpf && (
                <p className="text-destructive">{errors.cpf.message}</p>
              )}
            </section>
          </CardContent>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <section>
              <Label htmlFor="cellphone">Telefone:</Label>
              <Input
                id="cellphone"
                type="text"
                placeholder="(99)99999-9999"
                className={cn({ 'border-destructive': errors.cellphone })}
                maxLength={15}
                {...register('cellphone')}
                onChange={(e) =>
                  setValue('cellphone', formatPhone(e.target.value))
                }
              />
              {errors.cellphone && (
                <p className="text-destructive">{errors.cellphone.message}</p>
              )}
            </section>
            <section>
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                placeholder="joao@gmail.com"
                className={cn({ 'border-destructive': errors.email })}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-destructive">{errors.email.message}</p>
              )}
            </section>
          </CardContent>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <section>
              <Label htmlFor="password">Senha:</Label>
              <Input
                id="password"
                type="password"
                className={cn({ 'border-destructive': errors.password })}
                placeholder="*************"
                maxLength={60}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-destructive">{errors.password.message}</p>
              )}
            </section>
            <section>
              <Label htmlFor="confirm-password">Confirme sua senha:</Label>
              <Input
                id="confirm-password"
                type="password"
                className={cn({ 'border-destructive': errors.confirmPassword })}
                placeholder="*************"
                maxLength={60}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </section>
          </CardContent>
          <CardFooter>
            <Button type="submit" isLoading={isLoading}>
              Registrar
            </Button>
          </CardFooter>
        </form>
        <CardContent>
          <p>
            Já possui uma conta?{' '}
            <Link href="/auth/signin" className="font-semibold text-primary">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
      <Toaster />
    </main>
  );
}
