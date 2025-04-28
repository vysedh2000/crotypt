import prisma from "../../loaders/prisma";
import type { createStockDto, updateStockPriceDto } from "../types/stock.type";

export class StockRepository {
	public async findAll() {
		return prisma.stock.findMany();
	}

	public async findById(id: number) {
		return prisma.stock.findUnique({
			where: {
				id: id,
			},
		});
	}

	public async create(request: createStockDto) {
		return prisma.stock.create({
			data: {
				name: request.name,
				price: request.price,
				volume: request.volume,
				symbol: request.symbol,
			},
		});
	}

	public async updatePrice(request: updateStockPriceDto) {
		return prisma.stock.update({
			where: {
				id: request.id,
			},
			data: {
				price: request.price,
			},
		});
	}
}
