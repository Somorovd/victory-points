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
  const { user: currentUser } = useUser();
  const { users, addUser, removeUser } = useLobby();

  // useLifetimeLogging("useLobbySocket");

  const handleBeforeUnload = () => {
    console.log("useLobbySocket Unload", socket?.id);
    // socket?.emit(SocketEvents.LEAVE_ROOM, { lobbyId: lobby.id, user });
  };

  // console.log("before useEffect: ", socket?.id);

  useEffect(() => {
    console.log("useffect: ", socket?.id, currentUser?.username);
    if (!socket || !currentUser) return;

    const onUserJoined = ({ user }: { user: User }) => {
      // if (users[user.id] || user.id === currentUser.id) return;
      toast(`${user.username} joined!`);
      addUser(user);
    };

    const onUserLeft = ({ user }: { user: User }) => {
      if (user.id === currentUser.id) return;
      toast(`${user.username} left.`);
      removeUser(user);
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
  }, [currentUser, socket]);
};
