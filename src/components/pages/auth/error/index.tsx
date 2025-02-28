'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export function ErrorPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="flex flex-col items-center gap-4 p-4">
        <Image
          src="/img/unauthorized-bro.svg"
          alt="Man with email"
          width={300}
          height={300}
        />
        <h1>Ops! Houve um erro ao se autenticar, tente novamente!</h1>
        <Link href="/auth/signin">
          <Button>Voltar</Button>
        </Link>
      </Card>
    </div>
  );
}
