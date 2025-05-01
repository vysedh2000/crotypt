import type { NextFunction, Request, Response } from "express";
import { CryptoService } from "../service/crypto.service";
import {
	decryptData,
	getEncryptedData,
	sendSecureResponse,
} from "../../config/encryption";
import type {
	createCryptoDto,
	createCryptoResponse,
} from "../types/crypto.type";
import type { defaultRequest } from "../types/request.type";
import type { defaultResponse } from "../types/response.type";
import { SUCCESS } from "../../utils/appUtil";

export class CryptoController {
	private cryptoService: CryptoService;
	constructor() {
		this.cryptoService = new CryptoService();
	}

	public getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.cryptoService.getAllCryptos();
			const response: defaultResponse = {
				status: SUCCESS(),
				message: "",
				data: data,
			};
			sendSecureResponse(res, response);
		} catch (error: any) {
			res.status(500).send("Internal server error!");
			throw new Error(error);
		}
	};

	public create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload: createCryptoDto = getEncryptedData(req);
			const data = await this.cryptoService.createCrypto(payload);
			const response: defaultResponse = {
				status: "success",
				message: "",
				data: data,
			};

			sendSecureResponse(res, response);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	};
}
