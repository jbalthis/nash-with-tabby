import { Event } from "nostr-tools";

export type Filter = {
  ids?: string[];
  kinds?: number[];
  authors?: string[];
  since?: number;
  until?: number;
  limit?: number;
  [key: `#${string}`]: string[]
};

export declare function matchFilter(
  filter: Filter,
  event: Event & {
    id: string;
  }
): boolean;

export declare function matchFilters(
  filters: Filter[],
  event: Event & {
    id: string;
  }
): boolean;
