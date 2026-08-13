import { z } from "zod"

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email"),
  company: z.string().trim().max(120).optional(),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more about the work"),
  consent: z.literal(true, { error: "Please confirm you agree to be contacted" }),
  website: z.string().max(0).optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
