import * as z from "zod";

export const formSchema = z.object({
  relay: z.string().min(1, {
    message: "Relay is required",
  }),
  pkey: z.string().nullable(),
});
