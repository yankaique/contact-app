export type DeleteContactType = {
  contactId: string;
};

export type CreateContactType = {
  name: string;
  cellphone: string;
  cpf: string;
  uf: string;
  city: string;
  neighborhood: string;
  address: string;
  zipcode: string;
  number?: string;
  complement?: string;
};
