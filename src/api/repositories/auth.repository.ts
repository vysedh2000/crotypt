import prisma from "../../loaders/prisma";
import type { loginRequest } from "../types/auth.type";

export class AuthRepository {
	public async checkEmailOrUsername(payload: loginRequest) {
		return prisma.auth.findFirst({
			where: {
				OR: [{ email: payload.email }, { username: payload.username }],
			},
			omit: {
				password: false,
			},
		});
	}

	public async createAuth(email: string, username: string, password: string) {
		return prisma.$transaction(async tx => {
			const auth = await tx.auth.create({
				data: {
					email: email,
					username: username,
					password: password,
					uid: null,
				},
			});
			const user = await tx.user.create({
				data: {
					email: email,
					role_id: 1,
					username: username,
					auth_id: auth.id,
				},
			});
			await tx.auth.update({
				where: { id: auth.id },
				data: {
					uid: user.id,
				},
			});
			return user;
		});
	}

	public async updatePassword(
		password: string,
		username?: string,
		email?: string
	) {
		return prisma.auth.updateMany({
			where: {
				OR: [{ email: email }, { username: username }],
			},
			data: {
				password: password,
			},
		});
	}
}
