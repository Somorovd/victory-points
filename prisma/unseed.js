const { PrismaClient } = require("@prisma/client");
const { users } = require("./users");
const { games } = require("./games");

const prisma = new PrismaClient();

async function unseedTable(table, data) {
  for (let entry of data) {
    await table.deleteMany({
      where: { ...entry },
    });
  }
}

async function main() {
  unseedTable(prisma.user, users);
  unseedTable(prisma.game, games);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
  });
