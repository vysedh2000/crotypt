import type { NextFunction, Request, Response } from "express";
import { CryptoService } from "../service/crypto.service";
import {
	decryptData,
	getEncryptedData,
	sendSecureResponse,
} from "../../config/encryption";
import type { createCryptoDto, CryptoHisInsert } from "../types/crypto.type";
import {
	createErrorResponse,
	type defaultResponse,
} from "../types/response.type";
import { SUCCESS } from "../../utils/authConstant";

export class CryptoController {
	private cryptoService: CryptoService;
	constructor() {
		this.cryptoService = new CryptoService();
	}

	public getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.cryptoService.getAllCryptos();
			const response: defaultResponse = {
				status: SUCCESS,
				code: "",
				message: "",
				data: data,
			};
			sendSecureResponse(res, response);
		} catch (error: any) {
			sendSecureResponse(res, createErrorResponse(error.message, "500"));
		}
	};

	public create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload: createCryptoDto = getEncryptedData(req);
			const response = await this.cryptoService.createCrypto(payload);

			sendSecureResponse(res, response);
		} catch (error: any) {
			sendSecureResponse(res, createErrorResponse(error.message, "500"));
		}
	};

	public insertPriceHis = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const payload: CryptoHisInsert = getEncryptedData(req);
			const response = await this.cryptoService.insertCryptoHis(payload);
			sendSecureResponse(res, response);
		} catch (e: any) {
			sendSecureResponse(res, createErrorResponse(e.message, "500"));
		}
	};

	public cryptoPriceHis = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const payload: { symbol: string } = getEncryptedData(req);
			const response = await this.cryptoService.cryptoPriceHis(payload);
			sendSecureResponse(res, response);
		} catch (e: any) {
			sendSecureResponse(res, createErrorResponse(e.message, "500"));
		}
	};
}
