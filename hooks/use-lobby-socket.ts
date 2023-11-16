import { useSocket } from "@/components/providers/socket-provider";
import { User } from "@prisma/client";
import { useEffect } from "react";
import toast from "react-hot-toast";

type LobbySocketProps = {};

export const useLobbySocket = ({}: LobbySocketProps) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("user-joined", (user: User) => {
      // update store with the new user -> causing a rerender in the lobby users component
      toast(`${user.username} joined!`);
      console.log("recieved join");
    });
  }, []);
};
