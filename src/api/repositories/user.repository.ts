import prisma from "../../loaders/prisma";

export class UserRepository {
	public async createUser(email: string, username: string, name?: string) {
		return prisma.user.create({
			data: {
				email: email,
				role_id: 1,
				username: username,
				name: name,
			},
		});
	}
	public async updateUser(email?: string, username?: string, name?: string) {
		return prisma.user.updateMany({
			where: {
				OR: [{ email: email }, { username: username }],
			},
			data: {
				name: name,
				username: username,
				email: email,
			},
		});
	}
}
