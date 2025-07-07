"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  variant?: string; 
  size?: string;
  onClick?: () => void | undefined;
}

export const Button = ({ variant , size , children, className, appName , onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};
