import expressLoader from "./express";
import Logger from "../logger/logger";
import { redisClient, redisLoader } from "./redis";

export default async ({ expressApp }: any) => {
	try {
		console.log("Starting loader process...");

		// Ensure DB connection is established
		Logger.info("✌️ Database loaded");

		// Apply express loader
		await expressLoader({ app: expressApp });
		await redisLoader();

		const redis = await redisClient;

		redis.set("test", "✌️ Redis loaded");
		const redisData = await redis.get("test");

		// Log after express loader
		Logger.info("✌️ Express loaded");
		Logger.info(redisData);
	} catch (error) {
		console.error("Error in loader process:", error);
		throw error;
	}
};
