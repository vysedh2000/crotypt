import prisma from "../../loaders/prisma";

export class AuthRepository {
	public async checkEmailOrUsername(email?: string, username?: string) {
		return prisma.auth.findFirst({
			where: {
				OR: [{ email: email }, { username: username }],
			},
			omit: {
				password: false,
			},
			include: {
				user: true,
			},
		});
	}

	public async createAuth(email: string, username: string, password: string) {
		return prisma.auth.create({
			data: {
				email: email,
				username: username,
				password: password,
			},
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
