import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      role: "USER",
    },
  });
  console.log(user);
}