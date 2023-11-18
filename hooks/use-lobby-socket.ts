import { useSocket } from "@/components/providers/socket-provider";
import { SocketEvents } from "@/lib/socket-events";
import { useUser } from "@clerk/nextjs";
import { Lobby, User } from "@prisma/client";
import { useEffect } from "react";
import toast from "react-hot-toast";

type LobbySocketProps = {
  lobby: Lobby;
};

export const useLobbySocket = ({ lobby }: LobbySocketProps) => {
  const { socket } = useSocket();
  const { user } = useUser();
  const room = `lobby:${lobby.id}`;

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit(SocketEvents.JOIN_ROOM, { lobbyId: lobby.id, user });

    socket.on(SocketEvents.USER_JOINED, ({ user }: { user: User }) => {
      // update store with the new user ->
      // causing a rerender in the lobby users component
      toast(`${user.username} joined!`);
      console.log(`${user.username} joined!`);
    });

    socket.on(SocketEvents.USER_LEFT, ({ user }: { user: User }) => {
      toast(`${user.username} left.`);
      console.log(`${user.username} left.`);
    });

    const handleBeforeUnload = () => {
      socket.emit(SocketEvents.LEAVE_ROOM, { lobbyId: lobby.id, user });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBeforeUnload);
    };
  }, [user, socket]);
};
