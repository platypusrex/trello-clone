import bcrypt from 'bcryptjs';

export async function hashPassword (password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function validatePassword (password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}