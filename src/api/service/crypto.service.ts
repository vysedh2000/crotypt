import { CryptoRepository } from "../repositories/crypto.repository";
import type {
  createCryptoDto,
  createCryptoResponse,
  cryptoModel,
} from "../types/crypto";

export class CryptoService {
  private cryptoRepository: CryptoRepository;

  constructor() {
    this.cryptoRepository = new CryptoRepository();
  }

  public async getAllCryptos() {
    const data = await this.cryptoRepository.findAll();
    if (!data) {
      throw new Error("No data found!");
    }
    const response: cryptoModel[] = data;
    return response;
  }

  public async createCrypto(request: createCryptoDto) {
    const data = await this.cryptoRepository.createCrypto(request);
    if (!data) {
      throw new Error("Error adding crypto!");
    }
    const response: createCryptoResponse = {
      status: "success",
      message: "",
      data: data,
    };
    return response;
  }
}
