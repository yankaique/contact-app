export const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

export const formatName = (value: string) => {
  return value.split(' ').join('');
};

export const getInitials = (name: string) => {
  const upperName = name.toUpperCase();
  return `${formatName(upperName).charAt(0)}${formatName(upperName).charAt(2)}`;
};
