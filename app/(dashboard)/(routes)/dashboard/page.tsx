"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CodeIcon,
  Globe,
  ImageIcon,
  MessageSquare,
  Music,
  PenSquare,
  Speaker,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Summarization",
    icon: PenSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/summarization",
  },
  {
    label: "Audio Transcription",
    icon: Speaker,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/transcription",
  },
  {
    label: "Translation",
    icon: Globe,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/translation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/music",
  },
  {
    label: "Code Review",
    icon: CodeIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Data Vending Machine
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Post your jobs to Nostr - AI will do the rest
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="
              p-4 
              border-black/5
              flex
              items-center
              justify-between
              hover:shadow-md
              transition
              cursor-pointer
            "
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
