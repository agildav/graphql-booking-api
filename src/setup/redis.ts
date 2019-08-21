import { createClient, RedisClient } from "redis";

/** Redis server */
export default class Redis {
  private static REDIS_PASSWORD = process.env.REDIS_PASSWORD;
  private static REDIS_HOST = process.env.REDIS_HOST;
  private static REDIS_PORT = parseInt(process.env.REDIS_PORT, 10);
  private static redisClient: RedisClient = null;

  static async redisInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(":: Redis, starting");

      const client = createClient({
        host: Redis.REDIS_HOST,
        port: Redis.REDIS_PORT,
        password: Redis.REDIS_PASSWORD
      });

      return client.auth(Redis.REDIS_PASSWORD, (err, r) => {
        if (err != null || !client.connected) {
          console.log("error in redis init");
          return reject(err);
        }

        Redis.setRedisClient(client);
        return resolve();
      });
    });
  }

  private static setRedisClient(client: RedisClient) {
    Redis.redisClient = client;
  }

  /** Returns the redis client */
  static getRedisClient(): RedisClient {
    return Redis.redisClient;
  }
}
