"use client";
import React, { useState, createContext } from "react";
import { NostrEvent } from "@/lib/event";

interface IEventProvider {
  children?: React.ReactNode;
}

export interface Metadata {
  name?: string;
  picture?: string;
  nip05?: string;
}

// @ts-ignore
export const EventContext = createContext();

export const EventProvider: React.FC<IEventProvider> = ({ children }) => {
  const [event, setEvent] = useState<NostrEvent | null>();
  const [events, setEvents] = useState<NostrEvent[]>([]);
  const [metadata, setMetadata] = useState<Record<string, Metadata>>({});

  return (
    <EventContext.Provider
      value={{ event, setEvent, events, setEvents, metadata, setMetadata }}
    >
      {children}
    </EventContext.Provider>
  );
};
