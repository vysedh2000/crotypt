import { redisClient, redisLoader } from "../../loaders/redis";
import { createErrorResponse } from "../types/response.type";

export class GlobalService {
	public async saveToRedis(
		hashKey: string,
		cacheKey: string,
		data: string
	): Promise<void> {
		try {
			await redisClient.hSet(hashKey, cacheKey, data);
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
	public async deleteRedisByCacheKey(
		hashKey: string,
		cacheKey: string
	): Promise<void> {
		try {
			await redisClient.hDel(hashKey, cacheKey);
		} catch (e: any) {
			createErrorResponse(e.message);
			throw new Error(e.message);
		}
	}

	public async getByCacheKey(hashKey: string, cacheKey: string): Promise<void> {
		try {
			const data = await redisClient.hGet(hashKey, cacheKey);
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
}
