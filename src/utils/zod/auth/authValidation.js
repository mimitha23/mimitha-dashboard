import z from "zod";

export const authValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});
