
import React from "react";

export const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="border rounded p-2 w-full" {...props} />;
};
