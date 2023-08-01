"use client";
import React, { useState, createContext } from "react";
import { NostrEvent } from "@/lib/event";

interface ISubscribedProvider {
  children?: React.ReactNode;
}

// @ts-ignore
export const SubscribedContext = createContext();

export const SubscribedProvider: React.FC<ISubscribedProvider> = ({
  children,
}) => {
  const pk = process.env.USERS_PUBLIC_KEY as string;
  const [subscribed, setSubscribed] = useState<[string]>([pk]);

  return (
    <SubscribedContext.Provider value={{ subscribed, setSubscribed }}>
      {children}
    </SubscribedContext.Provider>
  );
};
