"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`py-2 px-4 text-sm font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${props.disabled ? "bg-gray-500 cursor-not-allowed" : "hover:bg-gray-200"}
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
}
