import type { NextFunction, Request, Response } from "express";
import { CryptoService } from "../service/crypto.service";
import { sendSecureResponse } from "../../config/encryption";

export class CryptoController {
  private cryptoService: CryptoService;
  constructor() {
    this.cryptoService = new CryptoService();
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.cryptoService.getAllCryptos();
      sendSecureResponse(res, data);
    } catch (error: any) {
      res.status(500).send("Internal server error!");
      throw new Error(error);
    }
  };
}
