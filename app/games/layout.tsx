import React from "react";

const GamesMainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[1200px] mx-auto">{children}</div>;
};

export default GamesMainLayout;
