'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  GoogleMaps,
  Toaster,
} from '@/components';
import { Contact } from '@prisma/client';
import { File, Phone, User } from 'feather-icons-react';
import Link from 'next/link';

export function InformationUserModalPage({ data }: { data: Contact }) {
  return (
    <Dialog modal>
      <DialogTrigger asChild onClick={() => {}}>
        <header className="flex cursor-pointer flex-col gap-2 rounded-md border border-solid border-slate-200 p-2">
          <div className="flex flex-row items-center gap-4">
            <User className="h-6 w-6" />
            <h1 className="w-full truncate font-semibold md:w-72">
              {data.name}
            </h1>
          </div>
          <div className="h-[1px] bg-slate-200" />
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row items-center gap-1">
              <File className="color-slate-200" width={16} height={16} />
              <p className="text-xs text-muted-foreground">{data.cpf}</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Phone color="" width={16} height={16} />
              <p className="text-xs text-muted-foreground">{data.cellphone}</p>
            </div>
          </div>
        </header>
      </DialogTrigger>
      <DialogContent className="p-0">
        <section className="h-2/4 p-5">
          <DialogHeader className="mb-4">
            <header className="flex flex-row items-center gap-4">
              <User className="h-6 w-6" />
              <DialogTitle>{data.name}</DialogTitle>
            </header>
            <div className="h-[1px] bg-slate-200" />
            <article className="flex flex-row items-center gap-1">
              <div className="flex flex-row items-center gap-1">
                <File className="color-slate-200" width={16} height={16} />
                <DialogDescription>{data.cpf}</DialogDescription>
              </div>
              <div className="flex flex-row items-center gap-1">
                <DialogDescription>
                  <Link
                    href={`https://wa.me/55${data.cellphone}?text=Olá,%20meu%20contato`}
                    target="_blank"
                  >
                    <Button variant="link">
                      <Phone
                        className="color-slate-200"
                        width={16}
                        height={16}
                      />
                      {data.cellphone}
                    </Button>
                  </Link>
                </DialogDescription>
              </div>
            </article>
          </DialogHeader>
          <h2 className="font-semibold">Localização:</h2>
          <GoogleMaps lat={Number(data.lat)} lng={Number(data.long)} />
          <p className="mt-4">
            {data.address} n°{data.number}, {data.neighborhood}, {data.city} -{' '}
            {data.uf}
          </p>
        </section>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
