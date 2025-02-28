'use server';
import axios from 'axios';

interface GeolocationProps {
  city: string;
  uf: string;
  address: string;
  neighborhood: string;
  number?: string;
}

const sliceValueToPlus = (value: string) => {
  return value.split(' ').join('+');
};

export const getGeolocation = async ({
  city,
  uf,
  address,
  neighborhood,
  number,
}: GeolocationProps) => {
  const fullAddress = sliceValueToPlus(
    `${address}+${neighborhood}+${number},${city}, ${uf}`,
  );
  const request = await axios.post(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.GOOGLE_API_KEY}`,
  );
  try {
    const response: {
      results: { geometry: { location: { lat: number; lng: number } } }[];
      status: string;
    } = await request.data;
    if (response.status === 'ZERO_RESULTS')
      return { error: 'Endereço não encontrado.' };
    const location = response.results[0].geometry.location;
    return location;
  } catch {
    return {
      error: 'Erro ao gerar o conteúdo.',
    };
  }
};
