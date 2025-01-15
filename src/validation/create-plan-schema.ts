import { z } from "zod";

// Define the `Settings` schema
const settingsSchema = z.object({
  payment_processors_limit: z.number(), //FIXME:   /////Not in design
  links_statistics_limit: z.number(),
  qr_codes_limit: z.number(),
  customer_domains_limit: z.number(),
  products_limit: z.number(),
  file_size: z.number(),
  image_size: z.number(),
  video_size: z.number(),
  removable_branding: z.boolean(),
  advanced_statistics: z.boolean(),
  seo: z.boolean(),
  password_protection: z.boolean(),
  ai_bio_link: z.boolean(),
  subscribe: z.boolean(),
  custom_footer_branding: z.boolean(),
  custom_backgrounds: z.boolean(),
  fonts: z.boolean(),
  sensitive_content: z.boolean(),
  prioritize_schedule: z.boolean(),
  analytics_integrations: z.boolean(),
  bio_pages_limit: z.number(), //FIXME:   /////Not in design
  bio_blocks_limit: z.number(),  //FIXME:   /////Not in design
  enabled_bio_link_blocks: z.record(z.string(), z.boolean()), // { [key: string]: boolean }





  // bio_links_limit: z.number(),
  // // bio_link_blocks_per_bio_link_page_limit: z.number(),

  // //FIXME:   /////Not in design
  // // links_limit: z.number(),

  // // ////////////////////////////////////////

});

export const CreatePlanSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(1, "name must be more than 1 character"),
  name_en: z
    .string({ required_error: "name_en is required" })
    .min(1, "name_en must be more than 1 character"),
  description: z
    .string({ required_error: "description is required" })
    .min(1, "description must be more than 1 character"),
  description_en: z
    .string({ required_error: "description_en is required" })
    .min(1, "description_en must be more than 1 character"),
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
