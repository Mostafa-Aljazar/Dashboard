export const PlanFeaturesLimits = [
  // { ////FIXME: Not in API
  //   label: "Biolinks Limit",
  //   hint: "Set -1 for unlimited.",
  //   formKey: "settings.bio_links_limit",
  // },
  {
    label: "QR Codes Limit",
    hint: "Set -1 for unlimited.",
    formKey: "settings.qr_codes_limit",
  },
  // { ////FIXME: Not in API
  //   label: "Biolink blocks per biolink page limit",
  //   hint: "Set -1 for unlimited.",
  //   formKey: "settings.bio_link_blocks_per_bio_link_page_limit",
  // },
  {
    label: "Custom Domains Limit",
    hint: "Set -1 for unlimited.",
    formKey: "settings.customer_domains_limit",
  },
  {
    label: "Links statistics retention",
    hint: "Set -1 for unlimited.",
    formKey: "settings.links_statistics_limit",
  },
  {
    label: "Products Limit",
    hint: "Set -1 for unlimited.",
    formKey: "settings.products_limit",
  },
  ///////start:  This is not in design
  // {
  //   ////FIXME: Not in API
  //   label: "Links Limit",
  //   hint: "Set -1 for unlimited.",
  //   formKey: "settings.links_limit",
  // },
  {
    //FIXME:   /////Not in design
    label: "Bio Pages Limit",
    hint: "Set -1 for unlimited.",
    formKey: "settings.bio_pages_limit",
  },
  {
    //FIXME:   /////Not in design
    label: "Bio Blocks Limit",
    hint: "Set -1 for unlimited.",
    formKey: "settings.bio_blocks_limit",
  },
  {
    //FIXME:   /////Not in design
    label: "Payment Processors Limit",
    hint: "Set -1 for unlimited.",
    formKey: "settings.payment_processors_limit",
  },
  ///////end.
  {
    label: "Files Size",
    hint: "Set -1 for unlimited.",
    formKey: "settings.file_size",
  },
  {
    label: "Video Size",
    hint: "Set -1 for unlimited.",
    formKey: "settings.video_size",
  },
  {
    label: "Image Size",
    hint: "Set -1 for unlimited.",
    formKey: "settings.image_size",
  },
  // { //FIXME:   /////Not in API
  //   label: "PDF Size",
  //   hint: "Set -1 for unlimited.",
  //   formKey: "settings.pdf_size",
  // },
];

export const PlanFeaturesBoolean = [
  {
    label: "Removable branding",
    description:
      "How many days will the links statistics be kept in the database.",
    formKey: "settings.removable_branding",
  },
  {
    label: "Custom Footer Branding",
    description:
      "This gives the option for people to add their custom branding for the biolinks footer.",
    formKey: "settings.custom_footer_branding",
  },
  {
    label: "Advanced Statistics",
    description:
      "Gives the user the ability to check more in depth statistics and select the time frame",
    formKey: "settings.advanced_statistics",
  },
  {
    label: "Custom Backgrounds",
    description:
      "Gives the user the ability to add custom backgrounds on their biolinks pages(colors, gradients and actual images)",
    formKey: "settings.custom_backgrounds",
  },
  {
    label: "SEO",
    description:
      "Gives the user the ability to change the Title and Meta Description of Biolink pages.",
    formKey: "settings.seo",
  },
  {
    label: "Fonts",
    description:
      "Gives the user the ability to pick a font of his liking from the list of extra fonts.",
    formKey: "settings.fonts",
  },
  {
    label: "Password protection",
    description: "Gives the user the ability to password protect their links.",
    formKey: "settings.password_protection",
  },
  {
    label: "Sensitive content warning",
    description:
      "Gives the user the ability to enable a sensitive content warning on their links",
    formKey: "settings.sensitive_content",
  },
  {
    label: "Ai Biolink",
    description: "Gives the user the ability to password protect their links.",
    formKey: "settings.ai_bio_link",
  },
  {
    label: "Prioritize & Schedule",
    description:
      "Gives the user the ability to enable a sensitive content warning on their links",
    formKey: "settings.prioritize_schedule",
  },
  {
    label: "Subscribe",
    description: "Gives the user the ability to password protect their links.",
    formKey: "settings.subscribe",
  },
  {
    label: "Analytics integrations",
    description:
      "Gives the user the ability to enable a sensitive content warning on their links",
    formKey: "settings.analytics_integrations",
  },
  // ////FIXME: NOT IN API
  // {
  //   label: "Payment",
  //   description: "Gives the user the ability to Connect payment getaway.",
  //   formKey: "settings.payment",
  // },
];

export const bio_link_blocks = {
  faq: false,
  zid: false,
  file: false,
  link: false,
  audio: false,
  image: false,
  salla: false,
  video: false,
  vimeo: false,
  header: false,
  paypal: false,
  twitch: false,
  discord: false,
  divider: false,
  product: false,
  socials: false,
  spotify: false,
  threads: false,
  x_tweet: false,
  youtube: false,
  facebook: false,
  snapchat: false,
  countdown: false,
  instagram: false,
  paragraph: false,
  x_profile: false,
  google_map: false,
  text_block: false,
  apple_music: false,
  sound_cloud: false,
  contact_form: false,
  image_slider: false,
  tiktok_video: false,
  buy_me_coffee: false,
  telegram_post: false,
  tiktok_profile: false,
  email_collector: false,
  pinterest_profile: false,
  share_stock_price: false,
};

// export const bio_link_blocks = {
//   apple_music: true,
//   audio: false,
//   buy_me_coffee: true,
//   contact_form: true,
//   countdown: false,
//   discord: false,
//   divider: true,
//   email_collector: false,
//   facebook: true,
//   faq: true,
//   file: false,
//   google_map: true,
//   header: true,
//   image: false,
//   image_slider: true,
//   instagram: false,
//   link: false,
//   paragraph: true,
//   paypal: false,
//   pinterest_profile: false,
//   product: true,
//   salla: false,
//   share_stock_price: false,
//   snapchat: false,
//   socials: true,
//   sound_cloud: false,
//   spotify: true,
//   telegram_post: false,
//   text_block: false,
//   threads: true,
//   tiktok_profile: false,
//   tiktok_video: true,
//   twitch: true,
//   video: true,
//   vimeo: false,
//   x_profile: false,
//   x_tweet: true,
//   youtube: false,
//   zid: true,
//   // link: false,
//   // paragraph: false,
//   // image: false,
//   // socials: false,
//   // email_collector: false,
//   // threads: false,
//   // sound_cloud: false,
//   // spotify: false,
//   // youtube: false,
//   // twitch: false,
//   // vimeo: false,
//   // tiktok_video: false,
//   // paypal: false,
//   // ////////// Phone collector
//   // apple_music: false,
//   // x_profile: false,
//   // x_tweet: false,
//   // pinterest_profile: false,
//   // instagram_media: false,
//   // snapchat_spotlight: false,
//   // //////////Contact Details
//   // divider: false,
//   // tiktok_profile: false,
//   // faq: false,
//   // facebook_post: false,
//   // discord_server: false,
//   // audio: false,
//   // video: false,
//   // countdown: false,
//   // ////////// Youtube Feed
//   // image_slider: false,
//   // ////////// PDF Document
//   // telegram_post: false,
//   // ////////// Donation
//   // product: false,
//   // salla: false,
//   // zid: false,
//   // ////////// Calendar Booking
//   // ////////// Map
//   // share_stock_price: false,
//   // //////////Link Folder
//   // // buy_me_a_coffee: false,
//   // contact_form: false,
//   // text_block: false,
//   // // //////////////
//   // buy_me_coffee: false,
//   // discord: false,
//   // google_map_location: false,
//   // file: false,
//   // header: false,
//   // snapchat: false,
//   // google_map: false,
//   // instagram: false,
//   // facebook: false,
//   // // /////////////////////////
//   // ///////////////////////
//   // ////////////////////
//   // // "instagram": true,
//   // // "facebook": true,
//   // // "google_map": true,
//   // // "snapchat": true,
//   // // "discord": true,
//   // // "buy_me_coffee": true,
//   // // "tiktok_profile": true
// };
