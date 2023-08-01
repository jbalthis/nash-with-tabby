"use client";
import { SimplePool, Event } from "nostr-tools";
import { useState, useEffect, createContext } from "react";

interface RelayProviderProps {
  children?: React.ReactNode;
}

export const RELAYS = [
  "wss://relayable.org",
  "wss://nostr.crypticthreadz.com",
  "wss://lightningrelay.com",
  "wss://nostr.wine",
  //"wss://brb.io",
];

// @ts-ignore
export const RelayContext = createContext<any>();

export const RelayProvider = ({ children }: RelayProviderProps) => {
  const [pool, setPool] = useState<SimplePool | null>(null);

  // setup relay pool

  // useEffect(() => {
  //   const _pool = new SimplePool();
  //   setPool(_pool);

  //   return () => {
  //     _pool.close(RELAYS);
  //   };
  // }, []);

  // subscribe to some events
  // useEffect(() => {
  //   if (!pool) {
  //     return;
  //   }

  //   const sub = pool.sub(RELAYS, [
  //     {
  //       kinds: [1],
  //       limit: 100,
  //       //"#t": ["nostr"]
  //     },
  //   ]);

  //   sub.on("event", (event: Event<1>) => {
  //     console.log(event);
  //   });

  //   return () => {
  //     sub.unsub();
  //   };
  // }, [pool]);

  return (
    <RelayContext.Provider value={{ pool, setPool }}>
      {children}
    </RelayContext.Provider>
  );
};
