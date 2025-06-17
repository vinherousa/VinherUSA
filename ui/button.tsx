
import React from "react";

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600" {...props}>{children}</button>;
};
