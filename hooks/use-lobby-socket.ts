"use client";
import { useSocket } from "@/components/providers/socket-provider";
import { SocketEvents } from "@/lib/socket-events";
import { useUser } from "@clerk/nextjs";
import { Lobby, User } from "@prisma/client";
import { useState, useEffect } from "react";
import { useLobby } from "./use-lobby-store";
import toast from "react-hot-toast";
import useLifetimeLogging from "./use-lifetime-logging";

type LobbySocketProps = {
  lobby: Lobby;
};

export const useLobbySocket = ({ lobby }: LobbySocketProps) => {
  const { socket } = useSocket();
  const { user } = useUser();
  const { addUser, removeUser } = useLobby();

  const handleBeforeUnload = () => {
    socket?.emit(SocketEvents.LEAVE_ROOM, { lobbyId: lobby.id, user });
  };

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit(SocketEvents.JOIN_ROOM, { lobbyId: lobby.id, user });

    const onUserJoined = ({ user }: { user: User }) => {
      toast(`${user.username} joined!`);
      addUser(user);
      console.log(`${user.username} joined!`);
    };

    const onUserLeft = ({ user }: { user: User }) => {
      toast(`${user.username} left.`);
      removeUser(user);
      console.log(`${user.username} left.`);
    };

    socket.on(SocketEvents.USER_JOINED, onUserJoined);
    socket.on(SocketEvents.USER_LEFT, onUserLeft);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBeforeUnload);

    return () => {
      socket.off(SocketEvents.USER_JOINED, onUserJoined);
      socket.off(SocketEvents.USER_LEFT, onUserLeft);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBeforeUnload);
    };
  }, [user, socket]);
};
