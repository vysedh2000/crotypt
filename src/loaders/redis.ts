import { createClient, type RedisClientType } from "redis";
import config from "../config/environement";

let redisClient: RedisClientType;

export function redisLoader() {
	redisClient = createClient({ url: config.redis.url });

	redisClient.on("error", err => {
		console.error("Redis Client Error", err);
	});

	redisClient.connect().then(() => {
		console.log("Redis client connected");
	});

	return redisClient;
}

export { redisClient };
