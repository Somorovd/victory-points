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

  // useLifetimeLogging("useLobbySocket");

  const handleBeforeUnload = () => {
    console.log("useLobbySocket Unload", socket?.id);
    socket?.emit(SocketEvents.LEAVE_ROOM, { lobbyId: lobby.id, user });
  };

  // console.log("before useEffect: ", socket?.id);

  useEffect(() => {
    console.log("useffect: ", socket?.id, user?.username);
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

    return () => {
      handleBeforeUnload();
      socket.off(SocketEvents.USER_JOINED, onUserJoined);
      socket.off(SocketEvents.USER_LEFT, onUserLeft);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, socket]);
};
