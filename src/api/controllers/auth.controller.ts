import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { getEncryptedData, sendSecureResponse } from "../../config/encryption";
import type { createUserRequest, loginRequest } from "../types/auth.type";
import { createErrorResponse } from "../types/response.type";
import { GlobalService } from "../service/global.service";
import { decodeToId } from "../../utils/authUtils";

export class AuthController {
	private authService: AuthService;
	private globalService: GlobalService;

	constructor() {
		this.authService = new AuthService();
		this.globalService = new GlobalService();
	}

	public signup = async (req: Request, res: Response, next: NextFunction) => {
		const payload: createUserRequest = getEncryptedData(req);
		try {
			const data = await this.authService.signUp(payload);
			sendSecureResponse(res, data);
		} catch (e: any) {
			createErrorResponse(e.message);
		}
	};
	public login = async (req: Request, res: Response, next: NextFunction) => {
		const payload: loginRequest = getEncryptedData(req);
		try {
			const data = await this.authService.login(payload);
			sendSecureResponse(res, data);
		} catch (e: any) {
			createErrorResponse(e.message);
		}
	};
	public test = async (req: Request, res: Response, next: NextFunction) => {
		const token = decodeToId(req.headers.sessionkey as string);
		res.send(token);
	};
}
