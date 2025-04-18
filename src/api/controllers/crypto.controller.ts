import type { NextFunction, Request, Response } from "express";
import { CryptoService } from "../service/crypto.service";
import { sendSecureResponse } from "../../config/encryption";
import type { createCryptoResponse } from "../types/crypto";

export class CryptoController {
  private cryptoService: CryptoService;
  constructor() {
    this.cryptoService = new CryptoService();
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.cryptoService.getAllCryptos();
      sendSecureResponse(res, JSON.stringify(data));
    } catch (error: any) {
      res.status(500).send("Internal server error!");
      throw new Error(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = req.body;
      const data = await this.cryptoService.createCrypto(requestData);
      sendSecureResponse(res, JSON.stringify(data));
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  };
}
