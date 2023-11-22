"use client";

import { useEffect } from "react";

export const useLifetimeLogging = (name: string) => {
  console.log(`loading ${name}`);

  const handleUnload = () => console.log(`unloading ${name}`);

  useEffect(() => {
    console.log(`useEffect ${name}`);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      console.log(`cleanup ${name}`);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
};

export default useLifetimeLogging;
