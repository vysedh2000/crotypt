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

  const hashedPassword = await hash("password123", 12);
  const defaultUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Default User",
      username: "defaultuser",
      password: hashedPassword,
      role_id: userRole.id,
    },
  });

  console.log(`Default User ${defaultUser.name} Created ✅`);
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
