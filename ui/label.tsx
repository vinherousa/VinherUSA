
import React from "react";

export const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className="block mb-1 font-medium text-gray-700" {...props}>{children}</label>;
};
