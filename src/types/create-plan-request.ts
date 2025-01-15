export interface CreatePlanRequest {
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  monthly_price: number;
  annual_price: number;
  is_active: boolean;
  is_featured: boolean;
  order: number;
  settings: Settings;
}

export interface Settings {
  // bio_links_limit:                         number; ////FIXME:
  // bio_link_blocks_per_bio_link_page_limit: number; ////FIXME:
  // links_limit:                             number; ////FIXME:

  payment_processors_limit: number;
  links_statistics_limit: number;
  qr_codes_limit: number;
  customer_domains_limit: number;
  products_limit: number;
  file_size: number;
  image_size: number;
  video_size: number;
  removable_branding: boolean;
  advanced_statistics: boolean;
  seo: boolean;
  password_protection: boolean;
  ai_bio_link: boolean;
  subscribe: boolean;
  custom_footer_branding: boolean;
  custom_backgrounds: boolean;
  fonts: boolean;
  sensitive_content: boolean;
  prioritize_schedule: boolean;
  analytics_integrations: boolean;
  bio_pages_limit: number;
  bio_blocks_limit: number;
  enabled_bio_link_blocks: { [key: string]: boolean };
}
