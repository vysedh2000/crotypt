import { password } from "bun";
import { z } from "zod";

export const createUser = z.object({
	email: z.string().email(),
	username: z.string().min(3).max(30),
	password: z.string().min(8).max(100),
});

export type createUserRequest = z.infer<typeof createUser>;
