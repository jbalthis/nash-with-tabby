import { Event } from "nostr-tools";

export type NostrEvent = Event & {
  kind: number;
  created_at: number;
  content: string;
  tags: [[string, string]];
}