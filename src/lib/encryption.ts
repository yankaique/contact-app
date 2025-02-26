import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_KEY;

function encryptData(data: string) {
  if (!SECRET_KEY) throw new Error('Chave de criptografia inválida');
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

function decryptData(encryptedData: string) {
  if (!SECRET_KEY) throw new Error('Chave de criptografia inválida');
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export { encryptData, decryptData };
