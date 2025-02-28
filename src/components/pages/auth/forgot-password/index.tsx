'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

export function ForgotPasswordPage() {
  const { loginWithoutPassword, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await loginWithoutPassword(data.email);
  };

  return (
    <main className="mt-8 flex h-36 w-screen items-center justify-center bg-background md:h-screen">
      <Card className={cn('w-[680px]')}>
        <CardHeader>
          <section>
            <CardTitle>Esqueci minha senha</CardTitle>
            <CardDescription>
              Digite seu email para receber um email mágico.
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
          </fieldset>
          <CardFooter className="flex flex-col items-center md:flex-row">
            <Button type="submit" isLoading={isLoading}>
              Enviar
            </Button>
          </CardFooter>
        </form>
        <CardContent>
          <p>
            Lembrei da minha senha!
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
