import { NostrEvent } from "@/lib/event";
import { RelayContext, RELAYS } from "@/providers/relay-provider";
import { EventContext } from "@/providers/event-provider";
import { SubscribedContext } from "@/providers/subscribed-provider";
import { useContext } from "react";

const pk = process.env.USERS_PUBLIC_KEY;

export function useJobResults() {
  const { pool, setPool } = useContext<any>(RelayContext);
  const { event, setEvent, events, setEvents } = useContext<any>(EventContext);

  if (!pool) {
    return;
  }

  // apply filters
  const sub = pool.sub(RELAYS, [
    {
      kinds: [65001],
      limit: 100,
    },
  ]);

  // parse events and update state
  sub.on("event", (event: NostrEvent) => {
    // console.log(`
    //     EVENT_OBJECT: \n${JSON.stringify(event)}\n
    //     KIND: ${JSON.stringify(event.kind)}\n
    //     PUB_KEY: ${JSON.stringify(event.pubkey)}\n
    //     CONTENT: ${JSON.stringify(event.content)}\n
    //     CREATED_AT: ${JSON.stringify(event.created_at)}\n
    //     ID: ${JSON.stringify(event.id)}\n
    //     TAGS: ${JSON.stringify(event.tags)}\n
    //   `);

    if (JSON.stringify(event.pubkey) === pk) {
      console.log(`**********Event added to state************\n`);
      setEvents((event: NostrEvent) => [...events, event]);
    }
  });

  return () => {
    sub.unsub();
  };
}
