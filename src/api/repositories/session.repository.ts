import type { Session } from "@prisma/client";
import prisma from "../../loaders/prisma";

export class SessionRepository {
	public async findSessionByUid(uid: string) {
		return prisma.session.findFirst({
			where: {
				user_id: uid,
			},
		});
	}
	public async createSession(session: Session) {
		await prisma.session.create({
			data: session,
		});
	}
	public async deleteSessionByUid(uid: string) {
		await prisma.session.deleteMany({
			where: {
				user_id: uid,
			},
		});
	}
}
