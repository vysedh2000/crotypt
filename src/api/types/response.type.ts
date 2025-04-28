import { z } from "zod";

export const defaultResponse = z.object({
	status: z.string(),
	messaage: z.string(),
	data: z.any().optional(),
});

export type defaultResponse = z.infer<typeof defaultResponse>;
