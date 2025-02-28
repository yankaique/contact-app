'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { Contact, User } from '@prisma/client';
import { useAuthStore, useContactsStore } from '@/controllers';
import {
  CardContent,
  NewUserModalPage,
  InformationUserModalPage,
  ScrollArea,
  Button,
} from '@/components';

export function DashboardPage({ data }: { data: User }) {
  const { contacts, getContactsController } = useContactsStore();
  const { logout } = useAuthStore();
  const updateContactList = async () => {
    await getContactsController();
  };
  const handleLogout = async () => {
    await logout();
  };
  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };
  useEffect(() => {
    updateContactList();
  }, []);
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="flex max-h-[600px] min-h-[600px] w-[600px] flex-col gap-4 p-2">
        <header className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="my-4 flex flex-col gap-2">
            <h1 className="w-72 truncate text-2xl font-semibold">
              Olá {getFirstName(data.name)}!
            </h1>
            <h2 className="text-1xl text-left font-semibold text-slate-500">
              Aqui está sua lista de contatos
            </h2>
          </div>
          <div>
            <NewUserModalPage />
          </div>
        </header>
        <div className="h-[1px] bg-slate-200" />
        <section>
          {contacts && contacts.length === 0 ? (
            <CardContent className="flex flex-col items-center gap-4">
              <Image
                src="/img/search-contact-bro.svg"
                alt="Empty"
                width={300}
                height={300}
              />
              <h1>Voce ainda não tem contatos!</h1>
            </CardContent>
          ) : (
            <ScrollArea className="flex h-72 w-full flex-col gap-4">
              {contacts &&
                contacts.map((contact: Contact) => (
                  <article key={contact.id} className="mb-2 cursor-pointer">
                    <InformationUserModalPage data={contact} />
                  </article>
                ))}
            </ScrollArea>
          )}
          <footer>
            <Button
              variant="link"
              className="mt-6 w-full"
              onClick={handleLogout}
            >
              Sair da minha conta
            </Button>
          </footer>
        </section>
      </section>
    </main>
  );
}
