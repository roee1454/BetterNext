import { createClient, type RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
    throw new Error("Missing `REDIS_URL`, please fix!");
}

declare global {
    var redis: RedisClientType | undefined
}

export const redis = global.redis || createClient({
    url: REDIS_URL,
}) 

if (process.env.NODE_ENV !== "production") {
    global.redis = redis;
}

redis.on("error", (err) => console.error("[REDIS] - Client Error: ", err))

redis.connect()