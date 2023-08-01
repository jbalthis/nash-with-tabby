"use client";
import { useEffect, useState } from "react";
import { useSubscribe } from "nostr-hooks";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NetworkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { formSchema } from "./constants";

export default function Home() {
  const [state, setState] = useState<"loading" | "error" | "done" | null>(null);
  const [relays, setRelays] = useState<[any]>();

  useEffect(() => {
    setState("loading");
    axios
      .get("/api/relays")
      .then((response: AxiosResponse) => setRelays(response.data))
      .then(() => setState("done"))
      .catch((e: Error | AxiosError) => setState("error"));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pkey: "",
      relay: "",
    },
  });

  if (!relays || state === "loading")
    return (
      <div className="flex h-screen w-full items-center justify-center bg-stone-900 text-white">
        <Loader />
      </div>
    );

  if (state === "error")
    return (
      <div className="flex h-screen w-full items-center justify-center bg-stone-900 text-white">
        <p>Something went wrong.</p>
      </div>
    );

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const connectRelay = async () => {
      const relay = values.relay;
      console.log("relay", relay);
    };
  };

  return (
    <div className="p-8">
      <Heading
        title="Active Relays"
        description="Choose your poison."
        icon={NetworkIcon}
        iconColor="text-blue-700"
        bgColor="bg-blue-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      id="prompt"
                      className="px-3 border-thin border-gray-200 outline-1 focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
                      disabled={isLoading}
                      placeholder="Enter your private key"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relay"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    name="relay"
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-gray-400">
                      {relays[0].map((option: any) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Connect
            </Button>
          </form>
        </Form>
        <div></div>
      </div>
    </div>
  );
}

// const { events, eose, invalidate } = useSubscribe({
//   relays: ["wss://relay.damus.io"],
//   filters: [{ kinds: [68002] }],
// });

// if (!events && !eose) return <p>Loading...</p>;

// return (
//   <ul>
//     {events.map((event) => (
//       <li key={event.id}>
//         <p>{event.pubkey}</p>
//         <p>{event.kind}</p>
//         <p>{event.content}</p>
//         <p>{event.tags}</p>
//       </li>
//     ))}
//   </ul>
// );
