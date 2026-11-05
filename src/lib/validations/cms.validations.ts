import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const pageMetaSchema = z.object({
  metaTitle: z.string().min(1, "Meta title is required"),
  metaDescription: z.string().min(1, "Meta description is required"),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  noIndex: z.boolean().default(false),
})

export const pageDetailsSchema = z.object({
  title: z.string().min(2, "Page title is required (min 2 characters)"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens (e.g. 'about-us')"),
  status: z.enum(["published", "draft", "archived"]),
  description: z.string().optional(),
})
