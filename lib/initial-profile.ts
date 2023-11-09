import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const userProfile = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (userProfile) return userProfile;

  const newProfile = await db.user.create({
    data: {
      id: user.id,
      username: `${user.username}`,
    },
  });

  return newProfile;
};
