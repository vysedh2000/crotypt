import type { Session, User } from "@prisma/client";
import {
	comparePassword,
	generateSession,
	hashPassword,
	signJwt,
} from "../../utils/authUtils";
import { AuthRepository } from "../repositories/auth.repository";
import { SessionRepository } from "../repositories/session.repository";
import { UserRepository } from "../repositories/user.repository";
import type {
	createUserRequest,
	loginRequest,
	sessionData,
} from "../types/auth.type";
import { createErrorResponse, defaultResponse } from "../types/response.type";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { GlobalService } from "./global.service";
import config from "../../config/environement";
import type { Response } from "express";

export class AuthService {
	private authRepository: AuthRepository;
	private sessionRepository: SessionRepository;
	private globalService: GlobalService;

	constructor() {
		this.authRepository = new AuthRepository();
		this.sessionRepository = new SessionRepository();
		this.globalService = new GlobalService();
	}

	public async signUp(payload: createUserRequest) {
		const hashPassowrd = await hashPassword(payload.password);
		try {
			const data = await this.authRepository.createAuth(
				payload.email,
				payload.username,
				hashPassowrd
			);
			const response: defaultResponse = {
				status: "success",
				message: "",
				data: data,
			};
			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
	public async login(payload: loginRequest, res: Response) {
		const auth = await this.authRepository.checkEmailOrUsername(payload);
		if (!auth) {
			throw new Error("Invalid credential!");
		}
		const isPasswordValid = await comparePassword(
			payload.password,
			auth.password
		);
		if (!isPasswordValid) {
			throw new Error("Invalid credential!");
		}
		try {
			await this.sessionRepository.deleteSessionByUid(auth.uid as string);
			const sessionToken = generateSession();
			const uid = auth.uid || "";
			const session = await this.createSession(
				sessionToken,
				uid,
				payload.noExp
			);

			const hashKey = config.redis.hashKey;
			if (uid) {
				this.globalService.saveToRedis(hashKey, uid, JSON.stringify(session));
			} else {
				throw new Error("User ID is null");
			}
			const userToken = signJwt({
				uid: uid,
				username: auth.username as string,
			});
			if (!userToken) {
				throw new Error("User token is null!");
			}

			const response: defaultResponse = {
				status: "success",
				message: "",
				data: {
					sessionToken: sessionToken,
					userToken: userToken,
					expired_at: session.expires_at,
				},
			};
			res.cookie("sessionToken", sessionToken, {
				httpOnly: true, // Cannot be accessed by JavaScript
				secure: process.env.NODE_ENV === "production", // Only sent over HTTPS
				sameSite: "lax", // 7 days expiry
			});
			return response;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	public async createSession(
		token: string,
		uid: string,
		noExp: boolean
	): Promise<Session> {
		try {
			const sessionId = encodeHexLowerCase(
				sha256(new TextEncoder().encode(token))
			);
			let expiration = 7 * 24 * 60 * 60 * 1000;
			if (noExp) {
				expiration = 360 * 24 * 60 * 60 * 1000;
			}
			const session: Session = {
				id: sessionId,
				user_id: uid,
				expires_at: new Date(Date.now() + expiration),
			};

			return session;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
}
