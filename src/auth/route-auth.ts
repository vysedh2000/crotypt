import type { Request, Response, NextFunction } from "express";
import { GlobalService } from "../api/service/global.service";
import { redisClient } from "../loaders/redis";
import config from "../config/environement";
import type { sessionData } from "../api/types/auth.type";
import { createErrorResponse } from "../api/types/response.type";
import { decodeToId, hexToText } from "../utils/authUtils";
import { sendSecureResponse } from "../config/encryption";

export type ProtectedRouteHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => void | Promise<void>;

function routeAuth(handler: ProtectedRouteHandler) {
	const globalService = new GlobalService();
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const encryptedToken = req.cookies.sessionToken;
			let token = decodeToId(encryptedToken);
			const hexId = req.headers.requestid;

			if (!(typeof token === "string") || !(typeof hexId === "string")) {
				throw new Error("Unauthorized request!");
			}
			let uid = hexToText(hexId);
			const sessionData: sessionData = JSON.parse(
				(await redisClient.hGet(config.redis.hashKey, uid)) as string
			);
			if (!sessionData) {
				throw new Error("Incorrect req ID");
			}
			const expiration = new Date(sessionData.expires_at);
			const now = new Date();
			if (expiration < now) {
				throw new Error("session expired");
			}
			if (!(sessionData.id == token)) {
				throw new Error("session expired");
			}
			await handler(req, res, next);
		} catch (e: any) {
			sendSecureResponse(res, JSON.stringify(createErrorResponse(e.message)));
		}
	};
}

export default routeAuth;
