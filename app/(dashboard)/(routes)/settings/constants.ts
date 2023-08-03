import * as z from "zod";

export const formSchema = z.object({
  relay: z.string().min(1),
  pubkey: z.string().min(1, {
    message: "Pubkey is required.",
  }),
});
