import { prisma } from "../index";

export const GET = async () => {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify({ users }));
};
