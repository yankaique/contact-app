'use client';
import { Button, Card } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export function VerifyEmailPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="flex flex-col items-center gap-4 p-4">
        <Image
          src="/img/email-bro.svg"
          alt="Man with email"
          width={300}
          height={300}
        />
        <h1>Enviamos um link de confirmação para o seu email!</h1>
        <Link href="/auth/signin">
          <Button>Voltar</Button>
        </Link>
      </Card>
    </div>
  );
}
