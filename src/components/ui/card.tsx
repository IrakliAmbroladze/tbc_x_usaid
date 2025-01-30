import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-400 p-6">
      {children}
    </div>
  );
};
