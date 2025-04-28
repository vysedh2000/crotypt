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
});

export const createCryptoResponse = z.object({
  status: z.string(),
  message: z.string(),
  data: createCrypto,
});

export const CryptoModel = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  volume: z.number(),
  symbol: z.string(),
});

export type createCryptoDto = z.infer<typeof createCrypto>;
export type createCryptoResponse = z.infer<typeof createCryptoResponse>;
export type cryptoModel = z.infer<typeof createCrypto>;
