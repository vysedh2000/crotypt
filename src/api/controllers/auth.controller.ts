import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { getEncryptedData } from "../../config/encryption";

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	public async signUp(req: Request, res: Response, next: NextFunction) {
		const payload = getEncryptedData(req);
	}
}
