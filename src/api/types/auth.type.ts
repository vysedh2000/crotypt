import { password } from "bun";
import { z } from "zod";

export const createUser = z.object({
	email: z.string().email(),
	username: z.string().min(3).max(30),
	password: z.string().min(8).max(100),
});
export const login = z.object({
	email: z.string().email().optional(),
	username: z.string().min(3).optional(),
	password: z.string(),
	noExp: z.boolean(),
});

export type createSession = {
	token: string;
};
export type identity = {
	uid: string;
};

export type jwtSign = {
	uid: string;
	username: string;
};

export type sessionData = {
	id: string;
	user_id: string;
	expires_at: string;
};
export type createUserRequest = z.infer<typeof createUser>;
export type loginRequest = z.infer<typeof login>;
