"use client";
import { SimplePool, Event, Relay } from "nostr-tools";
import { useState, useEffect, createContext } from "react";
import { set } from "zod";
import axios, { AxiosResponse, AxiosError } from "axios";

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
export const RelayContext = createContext<any>({
  pool: [],
  setPool: () => [],
  relay: "",
  setRelay: () => "",
});

export const RelayProvider = ({ children }: RelayProviderProps) => {
  const [pool, setPool] = useState<string[]>(RELAYS);
  const [relay, setRelay] = useState<string | null>("wss://relayable.org");
  const [state, setState] = useState<"loading" | "error" | "done" | null>(null);

  useEffect(() => {
    setState("loading");
    axios
      .get("/api/relays")
      .then((response: AxiosResponse) => {
        setPool(response.data);
      })
      .then(() => setState("done"))
      .catch((e: Error | AxiosError) => setState("error"));
  }, []);

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
    <RelayContext.Provider value={{ pool, setPool, relay, setRelay }}>
      {children}
    </RelayContext.Provider>
  );
};
