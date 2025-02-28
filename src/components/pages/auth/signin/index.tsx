'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Toaster } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { schema } from './schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/hooks/auth';

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
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Card className={cn('w-[680px]')}>
        <CardHeader>
          <div>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Faça login e adicione seus contatos.
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <CardFooter>
            <Button type="submit" isLoading={isLoading}>
              Entrar
            </Button>
          </CardFooter>
        </form>
        <CardContent>
          <p>
            Ainda não possui uma conta?{' '}
            <Link href="/auth/signup" className="font-bold text-primary">
              Registrar
            </Link>
          </p>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
