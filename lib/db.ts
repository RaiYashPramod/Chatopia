import { Redis } from '@upstash/redis';

const createRedisClient = () => {
  const redisConfig = {
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  };

  return new Redis({
    url: redisConfig.url,
    token: redisConfig.token,
  });
};

export const db = createRedisClient();
