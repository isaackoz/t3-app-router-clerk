import * as z from "zod"

export const postSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  clerkUser: z.string(),
  email: z.string(),
})
