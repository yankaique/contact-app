'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { schema } from './schema';
import { useAuthStore } from '@/controllers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button,
  Toaster,
} from '@/components';

export function SignInPage() {
  const { login, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <main className="mt-8 flex h-36 w-screen items-center justify-center bg-background md:h-screen">
      <Card className={cn('w-[680px]')}>
        <CardHeader>
          <section>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Faça login e adicione seus contatos.
            </CardDescription>
          </section>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <CardContent>
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
            </CardContent>
            <CardContent>
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
            </CardContent>
          </fieldset>
          <CardFooter className="flex flex-col items-center justify-between md:flex-row">
            <Button type="submit" isLoading={isLoading}>
              Entrar
            </Button>
            <Button
              onClick={() => redirect('/auth/forgot-password')}
              type="button"
              variant={'link'}
              className="p-0"
            >
              Esqueci minha senha
            </Button>
          </CardFooter>
        </form>
        <CardContent>
          <p>
            Ainda não possui uma conta?{' '}
            <Link href="/auth/signup" className="font-semibold text-primary">
              Registrar
            </Link>
          </p>
        </CardContent>
      </Card>
      <Toaster />
    </main>
  );
}
