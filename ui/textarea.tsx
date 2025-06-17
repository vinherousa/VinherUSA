
import React from "react";

export const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea className="border rounded p-2 w-full min-h-[100px]" {...props} />;
};
