"use client";

import { useEffect, useState } from "react";

import CreateLobbyModal from "@/components/modals/create-lobby-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateLobbyModal />
    </>
  );
};
