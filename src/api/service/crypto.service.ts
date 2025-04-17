import { CryptoRepository } from "../repositories/crypto.repository";

export class CryptoService {
  private cryptoRepository: CryptoRepository;

  constructor() {
    this.cryptoRepository = new CryptoRepository();
  }

  public async getAllCryptos() {
    return this.cryptoRepository.findAll();
  }
}
