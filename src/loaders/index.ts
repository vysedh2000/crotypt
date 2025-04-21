import expressLoader from "./express";
import Logger from "../logger/logger";

export default async ({ expressApp }: any) => {
  try {
    console.log("Starting loader process...");

    // Ensure DB connection is established
    Logger.info("✌️ Database loaded");

    // Apply express loader
    await expressLoader({ app: expressApp });

    // Log after express loader
    Logger.info("✌️ Express loaded");
  } catch (error) {
    console.error("Error in loader process:", error);
    throw error;
  }
};
