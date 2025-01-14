import {
  Button,
  Checkbox,
  Flex,
  Group,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CreatePlanSchema } from "../../../../validation/create-plan-schema";

const links = {
  link: false,
  paragraph: false,
  image: false,
  socials: false,
  email_collector: false,
  threads: false,
  sound_cloud: false,
  spotify: false,
  youtube: false,
  twitch: false,
  vimeo: false,
  tiktok_video: false,
  paypal: false,
  ////////// Phone collector
  apple_music: false,
  x_profile: false,
  x_tweet: false,
  pinterest_profile: false,
  instagram_media: false,
  snapchat_spotlight: false,
  //////////Contact Details
  divider: false,
  tiktok_profile: false,
  faq: false,
  facebook_post: false,
  discord_server: false,
  audio: false,
  video: false,
  countdown: false,
  ////////// Youtube Feed
  image_slider: false,
  ////////// PDF Document
  telegram_post: false,
  ////////// Donation
  product: false,
  salla: false,
  zid: false,
  ////////// Calendar Booking
  ////////// Map
  share_stock_price: false,
  //////////Link Folder
  // buy_me_a_coffee: false,
  contact_form: false,
  text_block: false,
  // //////////////
  buy_me_coffee: false,
  discord: false,
  google_map_location: false,
  file: false,
  header: false,
  snapchat: false,
  google_map: false,
  instagram: false,
  facebook: false,
};

function CreatePLan() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      monthly_price: "",
      annual_price: "",
      is_active: false,
      is_featured: false,
      order: "",
      settings: {
        bio_links_limit: 0,
        bio_link_blocks_per_bio_link_page_limit: 0,
        links_statistics_limit: 0,
        file_size: 0,
        image_size: 0,
        ///////////////
        qr_codes_limit: 0,
        customer_domains_limit: 0,
        products_limit: 0,
        video_size: 0,
        ////////////////not in design
        links_limit: 0,
        bio_pages_limit: 0,
        bio_blocks_limit: 0,
        payment_processors_limit: 0,
        // //////////

        removable_branding: false,
        custom_footer_branding: false,
        advanced_statistics: false,
        custom_backgrounds: false,
        seo: false,
        fonts: false,
        password_protection: false,
        sensitive_content: false,
        ai_bio_link: false,
        prioritize_schedule: false,
        subscribe: false,
        analytics_integrations: false,
        enabled_bio_link_blocks: links,
      },
    },

    validate: zodResolver(CreatePlanSchema),
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
  });

  const PlanFeaturesLimits = [
    {
      label: "Biolinks Limit",
      hint: "Set -1 for unlimited.",
      formKey: "settings.bio_links_limit",
    },
    {
      label: "QR Codes Limit",
      hint: "Set -1 for unlimited.",
      formKey: "settings.qr_codes_limit",
    },
    {
      label: "Biolink blocks per biolink page limit",
      hint: "Set -1 for unlimited.",
      formKey: "settings.bio_link_blocks_per_bio_link_page_limit",
    },
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
    {
      label: "Links Limit",
      hint: "Set -1 for unlimited.",
      formKey: "settings.links_limit",
    },
    {
      label: "Bio Pages Limit",
      hint: "Set -1 for unlimited.",
      formKey: "settings.bio_pages_limit",
    },
    {
      label: "Bio Blocks Limit",
      hint: "Set -1 for unlimited.",
      formKey: "settings.bio_blocks_limit",
    },
    {
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
    // //// this PDF not in API
    // {
    //   label: "PDF Size",
    //   hint: "Set -1 for unlimited.",
    //   formKey: "settings.pdf_size",
    // },
  ];
  const PlanFeaturesLimitsElements = () => {
    return (
      <>
        <div className="w-full flex flex-wrap gap-4">
          {PlanFeaturesLimits.map((item) => {
            return (
              <div
                key={item.formKey}
                className="w-[calc(50%-8px)] flex flex-col"
              >
                <NumberInput
                  label={<div>{item.label}</div>}
                  key={form.key(item.formKey)}
                  {...form.getInputProps(item.formKey)}
                  min={-1}
                />
                <span className="text-xs text-[#272B30] ">{item.hint}</span>
              </div>
            );
          })}
        </div>
        {/* <Flex flex={1} direction={"column"} gap={10}>
          {PlanFeatures.slice(6).map((item) => {
            return (
              <div key={item.formKey} className="flex flex-col">
                <NumberInput
                  label={<div>{item.label}</div>}
                  key={form.key(item.formKey)}
                  {...form.getInputProps(item.formKey)}
                />
                <span className="text-xs text-[#272B30] ">{item.hint}</span>
              </div>
            );
          })}
        </Flex> */}
      </>
    );
  };

  const PlanFeaturesBoolean = [
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
      description:
        "Gives the user the ability to password protect their links.",
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
      description:
        "Gives the user the ability to password protect their links.",
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
      description:
        "Gives the user the ability to password protect their links.",
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

  const PlanFeaturesBooleanElements = () => {
    return (
      <>
        <div className="w-full flex flex-wrap gap-4">
          {PlanFeaturesBoolean.map((item) => {
            return (
              <Switch
                className="w-[calc(50%-8px)] "
                size="xs"
                label={<div className="text-base">{item.label}</div>}
                description={
                  <span className="text-xs">{item.description}</span>
                }
                key={form.key(item.formKey)}
                {...form.getInputProps(item.formKey)}
              />
            );
          })}
        </div>
      </>
    );
  };

  const BioLinkBlocksBooleanElements = () => {
    return (
      <>
        {/* <div className="w-full flex flex-wrap gap-4">
          {PlanFeaturesBoolean.map((item) => {
            return (
              <Switch
                className="w-[calc(50%-8px)] "
                size="xs"
                label={<div className="text-base">{item.label}</div>}
                description={
                  <span className="text-xs">{item.description}</span>
                }
                key={form.key(item.formKey)}
                {...form.getInputProps(item.formKey)}
              />
            );
          })}
        </div> */}
        <div className="w-full flex flex-wrap gap-4">
          {Object.keys(links).map((key) => (
            // <Group key={key} mt="xs">
            <Switch
              className="w-[calc(50%-8px)] "
              key={form.key(`settings.enabled_bio_link_blocks.${key}`)}
              label={key}
              {...form.getInputProps(`settings.enabled_bio_link_blocks.${key}`)}
            />
            // </Group>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <Text className="font-normal text-2xl md:text-4xl">Create New Plan</Text>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col  gap-3 px-3 "
      >
        <>
          <TextInput
            size="md"
            label="Name"
            placeholder="name..."
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            size="md"
            label="Description"
            placeholder="description..."
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <NumberInput
            label="Order"
            placeholder="no Of Orders"
            key={form.key("order")}
            {...form.getInputProps("order")}
            min={0}
          />
          <NumberInput
            label="Monthly Price"
            placeholder="Cost of Monthly Price"
            key={form.key("monthly_price")}
            {...form.getInputProps("monthly_price")}
            min={0}
          />
          <NumberInput
            label="Annual Price"
            placeholder="Cost of Annual Price"
            key={form.key("annual_price")}
            {...form.getInputProps("annual_price")}
            min={0}
          />

          <Switch
            size="xs"
            label={<div className="text-base">Status</div>}
            key={form.key("is_active")}
            {...form.getInputProps("is_active")}
          />
        </>
        <Stack className="flex flex-col w-full">
          <Text className="font-normal text-xl">Plan features</Text>

          <div className="w-full flex flex-row gap-10 ">
            {PlanFeaturesLimitsElements()}
            {/* <Flex flex={1} direction={"column"} gap={10}>
              <div className="flex flex-col">
                <NumberInput
                  label={<div>Biolinks Limit</div>}
                  key={form.key("settings.bio_links_limit")}
                  {...form.getInputProps("settings.bio_links_limit")}
                />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
              <div className="flex flex-col">
                <NumberInput
                  label={<div>Biolink blocks per biolink page limit</div>}
                  key={form.key(
                    "settings.bio_link_blocks_per_bio_link_page_limit"
                  )}
                  {...form.getInputProps(
                    "settings.bio_link_blocks_per_bio_link_page_limit"
                  )}
                />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
              <div className="flex flex-col">
                <NumberInput
                  label={<div>Links statistics retention</div>}
                  key={form.key("settings.links_statistics_limit")}
                  {...form.getInputProps("settings.links_statistics_limit")}
                />
                <span className="text-xs text-[#272B30] ">
                  How many days will the links statistics be kept in the
                  database.
                </span>
              </div>
              <div className="flex flex-col">
                <NumberInput
                  label={<div>Files Size</div>}
                  key={form.key("settings.file_size")}
                  {...form.getInputProps("settings.file_size")}
                />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
              <div className="flex flex-col">
                <NumberInput
                  label={<div>Image Size</div>}
                  key={form.key("settings.image_size")}
                  {...form.getInputProps("settings.image_size")}
                />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
            </Flex> */}
            {/* <Flex flex={1} direction={"column"} gap={10}>
              <div className="flex flex-col">
                <TextInput label={<div>QR Codes Limit</div>} 
                />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
              <div className="flex flex-col">
                <TextInput label={<div>Custom Domains Limit</div>} />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
              <div className="flex flex-col">
                <TextInput label={<div>Products Limit</div>} />
                <span className="text-xs text-[#272B30] ">
                  How many days will the links statistics be kept in the
                  database.
                </span>
              </div>
              <div className="flex flex-col">
                <TextInput label={<div>Video Size</div>} />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
              <div className="flex flex-col">
                <TextInput label={<div>PDF Size</div>} />
                <span className="text-xs text-[#272B30] ">
                  Set -1 for unlimited.
                </span>
              </div>
            </Flex> */}
          </div>
          {/* Settings */}
          <div className="w-full flex flex-row gap-10 mt-10 ">
            {PlanFeaturesBooleanElements()}
            {/* <Flex flex={1} direction={"column"} gap={10}>
              <Switch
                size="xs"
                label={<div className="text-base">Removable branding</div>}
                description={
                  <span className="text-xs">
                    How many days will the links statistics be kept in the
                    database.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Advanced Statistics</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to check more in depth statistics
                    and select the time frame
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">SEO</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to change the Title and Meta
                    Description of Biolink pages.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Password protection</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to password protect their links.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Ai Biolink</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to password protect their links.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Subscribe</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to password protect their links.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Payment</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to Connect payment getaway.
                  </span>
                }
              />
            </Flex> */}
            {/* <Flex flex={1} direction={"column"} gap={10}>
              <Switch
                size="xs"
                label={<div className="text-base">Custom Footer Branding</div>}
                description={
                  <span className="text-xs">
                    This gives the option for people to add their custom
                    branding for the biolinks footer.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Custom Backgrounds</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to add custom backgrounds on
                    their biolinks pages (colors, gradients and actual images)
                  </span>
                }
              />

              <Switch
                size="xs"
                label={<div className="text-base">Fonts</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to pick a font of his liking from
                    the list of extra fonts.
                  </span>
                }
              />
              <Switch
                size="xs"
                label={
                  <div className="text-base">Sensitive content warning</div>
                }
                description={
                  <span className="text-xs">
                    Gives the user the ability to enable a sensitive content
                    warning on their links
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Prioritize & Schedule</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to enable a sensitive content
                    warning on their links
                  </span>
                }
              />
              <Switch
                size="xs"
                label={<div className="text-base">Analytics integrations</div>}
                description={
                  <span className="text-xs">
                    Gives the user the ability to enable a sensitive content
                    warning on their links
                  </span>
                }
              />
            </Flex> */}
          </div>
          {/* Biolink Blocks */}
          <div className="w-full flex flex-col gap-4">
            <Text className="text-xl">Biolink Blocks</Text>
            {BioLinkBlocksBooleanElements()}
          </div>
          {/*   <div className="w-full flex flex-row">
              <Flex direction={"column"}>
                <Switch
                  size="xs"
                  label={<div className="text-base">Link</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Image</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Email collector</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">SoundCloud</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">YouTube</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Vimeo</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">PayPal</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Apple Music</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">X Tweet</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Instagram Media</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Link</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Link</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Link</div>}
                />
                <Switch
                  size="xs"
                  label={<div className="text-base">Link</div>}
                />
              </Flex>
            </div>
          </div> */}
          <Text size="sm" mt="md" fw={500}>
            Enabled Bio Link Blocks
          </Text>

          {/* Dynamic fields for `enabled_bio_link_blocks` */}
        </Stack>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

export default CreatePLan;
