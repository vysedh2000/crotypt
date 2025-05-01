import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const [adminRole, userRole] = await Promise.all([
		prisma.role.upsert({
			where: { name: "Admin" },
			update: {},
			create: { name: "Admin" },
		}),
		prisma.role.upsert({
			where: { name: "User" },
			update: {},
			create: { name: "User" },
		}),
	]);

	console.log(`Role ${adminRole.name} Created ✅`);
	console.log(`Role ${userRole.name} Created ✅`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
