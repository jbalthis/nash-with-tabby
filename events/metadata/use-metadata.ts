import { useContext } from "react";
import { NostrEvent } from "@/lib/event";
import { RelayContext, RELAYS } from "@/providers/relay-provider";
import { EventContext, Metadata } from "@/providers/event-provider";

export function useMetadata() {
  const { pool, setPool } = useContext<any>(RelayContext);
  const { event, setEvent, events, setEvents, metadata, setMetadata } =
    useContext<any>(EventContext);

  if (!pool) {
    return;
  }

  const pubkeysToFetch = events.map((event: NostrEvent) => event.pubkey);
  const pk = process.env.USERS_PUBLIC_KEY;
  // apply filters
  const sub = pool.sub(RELAYS, [
    {
      kinds: [0],
      authors: pubkeysToFetch,
    },
  ]);

  // parse events and update state
  sub.on("event", (event: NostrEvent) => {
    console.log(event);

    const metadata = JSON.parse(event.content) as Metadata;

    setMetadata((cur: any) => ({
      ...cur,
      [event.pubkey]: metadata,
    }));

    if (JSON.stringify(event.pubkey) === pk) {
      console.log(`**********Event added to state************\n`);
      setEvents((event: NostrEvent) => [...events, event]);
    }
  });

  sub.on("eose", () => {
    sub.unsub();
  });
  console.log(`METADATA: \n${metadata}`);
  return () => {};
}
