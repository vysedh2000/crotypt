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
import { createErrorResponse } from "../api/types/response.type";
import { sendSecureResponse } from "../config/encryption";

export default function configureExpress({
	app,
}: {
	app: express.Application;
}): void {
	// Security and parsing middleware
	app.enable("trust proxy");
	const corsOptions = {
		origin: "http://localhost:3000",
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	};
	app.use(cors(corsOptions));
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(express.json());

	app.get("/status", (req: Request, res: Response) => {
		res.send("API is working").status(200).end();
	});
	app.head("/status", (req: Request, res: Response) => {
		res.send("API is working").status(200).end();
	});

	app.use(config.api.prefix, routes());

	app.use((req: Request, res: Response, next: NextFunction) => {
		sendSecureResponse(
			res,
			JSON.stringify(createErrorResponse("Endpoint not found!"))
		);
	});
}
