import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().pipe(z.email("Please enter a valid email address.")),
});
