import RedisStore from "connect-redis";
import Redis from "ioredis";

// Initialize client.
const redis = new Redis(
  {
    host: "redis",
  }
);

// Initialize store.
const redisStore = new RedisStore({
  disableTouch: true,
  client: redis,
  prefix: "myapp:",
});

export { redis, redisStore };
