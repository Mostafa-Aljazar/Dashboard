import { z } from "zod";

// Define the `Settings` schema
const settingsSchema = z.object({
  bio_links_limit: z.number(),
  bio_link_blocks_per_bio_link_page_limit: z.number(),
  file_size: z.number(),
  image_size: z.number(),
  links_statistics_limit: z.number(),
  qr_codes_limit: z.number(),
  customer_domains_limit: z.number(),
  products_limit: z.number(),
  video_size: z.number(),

  //FIXME:   /////Not in design
  links_limit: z.number(),
  bio_pages_limit: z.number(),
  bio_blocks_limit: z.number(),
  payment_processors_limit: z.number(),

  // ////////////////////////////////////////

  removable_branding: z.boolean(),
  custom_footer_branding: z.boolean(),
  advanced_statistics: z.boolean(),
  custom_backgrounds: z.boolean(),
  seo: z.boolean(),
  fonts: z.boolean(),
  password_protection: z.boolean(),
  sensitive_content: z.boolean(),
  ai_bio_link: z.boolean(),
  prioritize_schedule: z.boolean(),
  subscribe: z.boolean(),
  analytics_integrations: z.boolean(),

  enabled_bio_link_blocks: z.record(z.string(), z.boolean()), // { [key: string]: boolean }
});

export const CreatePlanSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(1, "name must be more than 1 character"),
  name_en: z.string(),
  description: z.string(),
  description_en: z.string(),
  monthly_price: z
    .number()
    .min(0, { message: "Monthly price must be a positive number" }),
  annual_price: z
    .number()
    .min(0, { message: "Annual price price must be a positive number" }),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  order: z.number().min(0, "order must be positive"),
  settings: settingsSchema, // Nested `Settings` schema
});
