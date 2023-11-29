"use client";
import { useSocket } from "@/components/providers/socket-provider";
import { SocketEvents } from "@/lib/socket-events";
import { useUser } from "@clerk/nextjs";
import { Lobby, User } from "@prisma/client";
import { useEffect } from "react";
import { useLobby } from "./use-lobby-store";
import toast from "react-hot-toast";

type LobbySocketProps = {
  lobby: Lobby;
};

export const useLobbySocket = ({ lobby }: LobbySocketProps) => {
  const { socket } = useSocket();
  const { user: currentUser } = useUser();
  const { users, addUser, removeUser } = useLobby();

  useEffect(() => {
    if (!socket || !currentUser) return;

    const onUserJoined = ({
      user,
      socketId,
    }: {
      user: User;
      socketId: string;
    }) => {
      console.log(`User Joined -- user: ${user.username} socket: ${socketId}`);
      toast(`${user.username} joined!`);
      addUser({ ...user, socketId: socketId });
    };

    const onUserLeft = ({
      user,
      socketId,
    }: {
      user: User;
      socketId: string;
    }) => {
      console.log(`User Left -- user: ${user.username} socket: ${socketId}`);
      toast(`${user.username} left.`);
      removeUser(user);
    };

    socket.on(SocketEvents.USER_JOINED, onUserJoined);
    socket.on(SocketEvents.USER_LEFT, onUserLeft);

    return () => {
      socket.off(SocketEvents.USER_JOINED, onUserJoined);
      socket.off(SocketEvents.USER_LEFT, onUserLeft);
    };
  }, [currentUser, socket]);

  useEffect(() => {
    console.log("USERS: ", users);
  }, [users]);
};
