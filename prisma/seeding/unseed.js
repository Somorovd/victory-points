const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();
  await prisma.lobby.deleteMany();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
  });
