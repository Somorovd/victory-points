import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import Image from "next/image";

interface LobbyUsersIconProps {
  user: User;
  host: User;
}

const LobbyUserIcon = ({ user, host }: LobbyUsersIconProps) => {
  const { user: currentUser } = useUser();

  // TODO: Load a skeleton instead;
  if (!currentUser) return null;

  return (
    <div
      className={cn(
        "w-[80px] h-[80px] border-white border-[1px] object-cover overflow-hidden",
        user.id === currentUser!.id && "order-[-1]",
        user.id === host.id && "bg-orange-300"
      )}
    >
      {/* <Image src={user.profileImage}/> */}
      {user.username}
    </div>
  );
};

export default LobbyUserIcon;
