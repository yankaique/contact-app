import axios from 'axios';

export const getAddressByCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.data;
    if (data.erro) {
      return { error: 'CEP não encontrado.' };
    }
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      ...data,
    };
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};

export const getUfs = async () => {
  try {
    const response = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );
    const data = await response.data;
    return data;
  } catch {
    return { error: 'Ocorreu um erro, tente novamente mais tarde.' };
  }
};
