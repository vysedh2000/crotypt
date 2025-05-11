import { symbol, z } from "zod";

export const createCrypto = z.object({
	name: z
		.string()
		.min(1, { message: "Name must be at least 1 character!" })
		.max(30),
	price: z.number().min(1, { message: "Price must be at least 1!" }),
	volume: z.number().min(1, { message: "Volume must be at least 1!" }),
	symbol: z
		.string()
		.min(2, { message: "Symbol must be at least 2 characters!" })
		.max(5, { message: "Symbol must be at most 5 characters!" }),
	ccy: z.string().min(3).max(3),
	imageUrl: z.string().min(10).max(500),
});

export const CryptoModel = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	volume: z.number(),
	symbol: z.string(),
});

export const CryptoHisInsert = z.object({
	symbol: z.string().min(3).max(3),
	price: z.number(),
	dateTime: z.string(),
	ccy: z.string().min(3).max(3),
});

export type createCryptoDto = z.infer<typeof createCrypto>;
export type cryptoModel = z.infer<typeof createCrypto>;
export type CryptoHisInsert = z.infer<typeof CryptoHisInsert>;
