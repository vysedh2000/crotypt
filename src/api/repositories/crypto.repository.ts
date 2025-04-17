import prisma from "../../loaders/prisma";
import type { createCryptoDto } from "../types/crypto";

export class CryptoRepository {
  public async findAll() {
    return prisma.crypto.findMany();
  }

  public async findById(id: number) {
    return prisma.crypto.findMany({
      where: {
        id: id,
      },
    });
  }

  public async createCrypto(request: createCryptoDto) {
    return prisma.crypto.create({
      data: {
        name: request.name,
        price: request.price,
        volume: request.volume,
        symbol: request.symbol,
      },
    });
  }

  public async updatePrice(request: { id: number; price: number }) {
    return prisma.crypto.update({
      where: {
        id: request.id,
      },
      data: {
        price: request.price,
      },
    });
  }
}
