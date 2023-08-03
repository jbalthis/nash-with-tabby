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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Settings } from "lucide-react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { formSchema } from "./constants";
import { SimplePool } from "nostr-tools";
import { RelayContext } from "@/providers/relay-provider";

const SettingsPage = () => {
  //const [pk, setPk] = useState("");

  const [settings, setSettings] = useState<any>({});
  const [state, setState] = useState<"loading" | "error" | "done" | null>(null);
  const { pool, relay, setPool, setRelay } = useContext(RelayContext);

  const router = useRouter();

  // useEffect(() => {
  //   setState("loading");
  //   axios
  //     .get("/api/relays")
  //     .then((response: AxiosResponse) => setPool(response.data))
  //     .then(() => setState("done"))
  //     .catch((e: Error | AxiosError) => setState("error"));
  // }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pubkey: "",
      relay,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    if (!state) return setState("loading");
  });

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
                          id="pubkey"
                          type="text"
                          name="pubkey"
                          //onSubmit={(e) => setInputValue(e.target.value)}
                          //value={field.value}
                          disabled={isLoading}
                          placeholder="Public Key"
                          className="border-1 mb-4 px-2 outline focus-visible:ring-sky-500 focus-visible:ring-2"
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
                        <SelectContent className="text-gray-600">
                          {pool.map((option: any) => (
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
