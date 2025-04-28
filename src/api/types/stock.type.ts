import { z } from "zod";

export const createStock = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character!" })
    .max(100),
  price: z.number().min(0, { message: "Price must be a positive number!" }),
  volume: z.number().min(0, { message: "Volume must be a positive number!" }),
  symbol: z
    .string()
    .min(2, { message: "Symbol must be at least 2 characters!" })
    .max(5, { message: "Symbol must be at most 5 characters!" }),
});
export const updatePrice = z.object({
  id: z.number(),
  price: z.number().min(0, { message: "Price must be a positive number!" }),
});

export type createStockDto = z.infer<typeof createStock>;
export type updateStockPriceDto = z.infer<typeof updatePrice>;
