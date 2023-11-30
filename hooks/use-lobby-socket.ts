"use client";
import { useSocket } from "@/components/providers/socket-provider";
import { SocketEvents } from "@/lib/socket-events";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useLobby } from "./use-lobby-store";
import toast from "react-hot-toast";
import { LobbyWithAllUsers } from "@/types";

type LobbySocketProps = {
  lobby: LobbyWithAllUsers;
};

export const useLobbySocket = ({ lobby }: LobbySocketProps) => {
  const { socket } = useSocket();
  const { user: currentUser } = useUser();
  const { users, addUser, removeUser, setUsers, setHost } = useLobby();

  useEffect(() => {
    console.log("initial lobby store setup");
    setUsers(lobby.users);
    setHost(lobby.host);
  }, []);

  useEffect(() => {
    if (!socket || !currentUser) return;

    addUser({ ...(currentUser as User), socketId: socket.id });
    socket.emit(SocketEvents.JOIN_ROOM, {
      lobbyId: lobby.id,
      user: currentUser,
    });

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
      console.log(`user left: id: ${user.id} socket: ${socketId}`);
      if (user.id === currentUser.id) return;
      if (users[user.id] && users[user.id].socketId === socketId) {
        toast(`${user.username} left.`);
        removeUser(user);
      }
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
