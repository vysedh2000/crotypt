import prisma from "../../loaders/prisma";
import type { createCryptoDto, CryptoHisInsert } from "../types/crypto.type";

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
				ccy: request.ccy,
				imageUrl: request.imageUrl,
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

	public async insertPriceHis(request: CryptoHisInsert) {
		return prisma.cryptoHistory.create({
			data: {
				symbol: request.symbol,
				price: request.price,
				ccy: request.ccy,
				time: request.dateTime,
			},
		});
	}

	public async cryptoPriceHis(request: { symbol: string }) {
		return prisma.cryptoHistory.findMany({
			where: {
				symbol: request.symbol,
			},
		});
	}
}
