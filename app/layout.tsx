import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EventProvider } from "@/providers/event-provider";
import { RelayProvider } from "@/providers/relay-provider";
import { SubscribedProvider } from "@/providers/subscribed-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DVM Dashboard",
  description: "Submit and manage your jobs on the Nostr protocol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RelayProvider>
      <EventProvider>
        <SubscribedProvider>
          <ClerkProvider>
            <html lang="en">
              <body className={inter.className}>{children}</body>
            </html>
          </ClerkProvider>
        </SubscribedProvider>
      </EventProvider>
    </RelayProvider>
  );
}
