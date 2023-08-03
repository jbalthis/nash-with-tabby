import * as z from "zod";

export const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required.",
  }),
  upload: z.string().nullable(),
});
