'use client';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
export function HomePage() {
  const handleRedirect = (path: string) => {
    redirect(path);
  };
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <section className="flex flex-col items-start justify-start gap-2">
        <h1 className="text-4xl font-bold md:w-96">
          Atualize sua lista telefônica pro nosso app quase funcional!
        </h1>
        <p>
          Seu site de contatos com localização precisa e quase em tempo real.
        </p>
        <Button
          variant={'link'}
          className="p-0"
          onClick={() => handleRedirect('/auth/signup')}
        >
          Quero fazer parte desse grupo!
        </Button>
      </section>
    </main>
  );
}
