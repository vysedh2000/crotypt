import { z } from "zod";

export const defaultRequest = z.object({
    payload: z.string()
})

export type defaultRequest = z.infer<typeof defaultRequest>