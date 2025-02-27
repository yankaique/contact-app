import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

type VerifyPasswordProps = {
  password: string;
  hashedPassword: string;
};

async function verifyPassword({
  password,
  hashedPassword,
}: VerifyPasswordProps) {
  return await bcrypt.compare(password, hashedPassword);
}
export { hashPassword, verifyPassword };
