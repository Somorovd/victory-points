import React from "react";

const GamePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full w-[1200px] m-auto">{children}</div>;
};

export default GamePageLayout;
