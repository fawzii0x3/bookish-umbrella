import RedisStore from "connect-redis";
import { createClient } from "redis";

// Initialize client.
const redis = createClient({
  url:"redis://redis:6379"
});

// Initialize store.
const redisStore = new RedisStore({
  disableTouch: true,
  client: redis,
});

export { redis, redisStore };
