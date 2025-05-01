import express from "express";
import type {
	Request,
	Response,
	NextFunction,
	ErrorRequestHandler,
} from "express";
import cors from "cors";
import routes from "../api";
import methodOverride from "method-override";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import config from "../config/environement";
import { redisClient } from "./redis";

export default function configureExpress({
	app,
}: {
	app: express.Application;
}): void {
	// Security and parsing middleware
	app.enable("trust proxy");
	app.use(cors());
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(express.json());

	// Health check endpoints
	app.get("/status", (req: Request, res: Response) => {
		res.send("API is working").status(200).end();
	});
	app.head("/status", (req: Request, res: Response) => {
		res.send("API is working").status(200).end();
	});

	// API routes
	app.use(config.api.prefix, routes());

	// 404 Handler - should be after all valid routes
	app.use((req: Request, res: Response, next: NextFunction) => {
		next(createHttpError(404, "Endpoint Not Found"));
	});
}
