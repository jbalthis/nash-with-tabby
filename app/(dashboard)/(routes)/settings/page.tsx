"use client";
import React, { useState, useEffect, useContext } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Settings } from "lucide-react";
import axios from "axios";
import { formSchema } from "./o-";
import { SimplePool } from "nostr-tools";
import { RelayContext } from "@/providers/relay-provider";

const SettingsPage = () => {
  //const [pk, setPk] = useState("");
  const [settings, setSettings] = useState<any>({});

  const relay = useContext<any>(RelayContext);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pubkey: "",
      relay,
    },
  });

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setInputValue(form.getValues("pubkey"));
  //   }, 1000);
  // });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const _pool = new SimplePool();
    setSettings({ relay: values.relay, pubkey: values.pubkey });
    relay.setPool(_pool);
    relay.pool.sub([values.relay], {
      kinds: [1],
      limit: 100,
      //"#t": ["nostr"]
    });
    console.log(values.relay);
  };

  return (
    <>
      <div>
        <Heading
          title="Settings"
          description="Fine tune your experience"
          icon={Settings}
          iconColor="text-gray-800"
          bgColor="bg-gray-800/10"
        />
        <div className="px-4 lg:px-8">
          <div>
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
                <h2 className="col-span-12 lg:col-span-10 text-center py-2 text-xl font-bold w-full">
                  Nostr Configuration
                </h2>
                <FormField
                  name="pubkey"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          {...field}
                          //onSubmit={(e) => setInputValue(e.target.value)}
                          //value={inputValue}
                          disabled={isLoading}
                          placeholder="Public Key"
                          className="border-1 mb-4 px-2 outline focus-visible:ring-sky-500 focus-visible:ring-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="relay"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="Relay"
                          className="border-1 mb-2 outline px-2 focus-visible:ring-sky-500 focus-visible:ring-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="mt-4 col-span-12 lg:col-span-10 w-full"
                >
                  Save Settings
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
