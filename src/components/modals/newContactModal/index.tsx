'use client';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Toaster } from 'sonner';
import { Plus } from 'feather-icons-react';
import { cn } from '@/lib/utils';
import { formatCPF, formatPhone } from '@/utils/formatData';
import { useContactsStore, useUtilsStore } from '@/controllers';
import { schema } from './schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ScrollArea,
} from '@/components';

export function NewUserModalPage() {
  const { address, getAddressByCepController, getUfsController, ufs } =
    useUtilsStore();
  const { createContactController, isContactLoading } = useContactsStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const cep = watch('zipcode');

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await createContactController(data);
    reset();
  };

  const setUfValues = async () => {
    await getUfsController();
  };

  const setAddressValues = () => {
    if (address) {
      setValue('address', address.logradouro);
      setValue('city', address.city);
      setValue('neighborhood', address.neighborhood);
      setValue('uf', address.uf);
      setValue('complement', address.complemento);
    }
  };

  useEffect(() => {
    setUfValues();
  }, []);

  useEffect(() => {
    if (cep && cep.length === 8) {
      getAddressByCepController(cep);
    }
  }, [cep]);

  useEffect(() => {
    setAddressValues();
  }, [address]);

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          <Plus /> Contato
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <ScrollArea className="h-[100vh] p-5 md:h-full">
          <DialogHeader className="mx-2 mb-4">
            <DialogTitle>Cadastrar novo contato</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para cadastrar um novo contato.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-2 flex flex-col gap-2"
          >
            <div>
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <Label htmlFor="zipcode">CEP:</Label>
                <Input
                  id="zipcode"
                  type="number"
                  placeholder="99999-999"
                  className={cn({ 'border-destructive': errors.zipcode })}
                  maxLength={9}
                  {...register('zipcode')}
                />
                {errors.zipcode && (
                  <p className="text-destructive">{errors.zipcode.message}</p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="city">Cidade:</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Aparecida"
                  className={cn({ 'border-destructive': errors.city })}
                  maxLength={15}
                  {...register('city')}
                />
                {errors.city && (
                  <p className="text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-end gap-1 md:w-1/3">
                <Label htmlFor="uf">Estado:</Label>
                <div className="md:flex md:items-end md:justify-end">
                  <Select {...register('uf')}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue
                        placeholder="Estado"
                        defaultValue={watch('uf')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {ufs &&
                        ufs.map((uf) => (
                          <SelectItem key={uf.id} value={uf.sigla}>
                            {uf.sigla}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="neighborhood">Bairro:</Label>
              <Input
                id="neighborhood"
                type="text"
                placeholder="Morumbi"
                className={cn({ 'border-destructive': errors.neighborhood })}
                maxLength={15}
                {...register('neighborhood')}
              />
              {errors.neighborhood && (
                <p className="text-destructive">
                  {errors.neighborhood.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full">
                <Label htmlFor="address">Rua:</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Rua das palmeiras"
                  className={cn({ 'border-destructive': errors.address })}
                  maxLength={15}
                  {...register('address')}
                />
                {errors.address && (
                  <p className="text-destructive">{errors.address.message}</p>
                )}
              </div>
              <div className="w-full md:w-1/5">
                <Label htmlFor="number">Número:</Label>
                <Input
                  id="number"
                  type="text"
                  placeholder="190"
                  className={cn({ 'border-destructive': errors.number })}
                  maxLength={15}
                  {...register('number')}
                />
                {errors.number && (
                  <p className="text-destructive">{errors.number.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="complement">Complemento:</Label>
              <Input
                id="complement"
                type="text"
                placeholder="Apto. 1"
                className={cn({ 'border-destructive': errors.complement })}
                maxLength={15}
                {...register('complement')}
              />
              {errors.complement && (
                <p className="text-destructive">{errors.complement.message}</p>
              )}
            </div>
            <div className="mt-4 w-full">
              <Button type="submit" isLoading={isContactLoading}>
                Cadastrar
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
