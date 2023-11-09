const { PrismaClient } = require("@prisma/client");
const { users } = require("./users");
const { games } = require("./games");

const prisma = new PrismaClient();

async function seedTable(table, data) {
  for (let entry of data) {
    await table.create({ data: entry });
  }
}

async function main() {
  seedTable(prisma.user, users);
  seedTable(prisma.game, games);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
  });
