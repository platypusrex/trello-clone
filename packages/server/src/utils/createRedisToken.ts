import { v4 } from 'uuid';
import { redis } from '../redis';

export async function createRedisToken (userId: number, tokenPrefix: string): Promise<string> {
  const token = v4();
  await redis.set(
    tokenPrefix + token,
    userId,
    'ex', 60 * 60 * 24
  ); // 1 day exp

  return token;
}