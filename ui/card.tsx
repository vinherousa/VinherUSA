
import React from "react";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`rounded-lg border bg-white p-4 shadow ${className}`}>{children}</div>;
};
