import {
  Button,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CreatePlanSchema } from "../../../../validation/create-plan-schema";
import { CreatePlan } from "../../api-handlers/createPlan";
import { useNavigate } from "react-router-dom";
import {
  bio_link_blocks,
  PlanFeaturesBoolean,
  PlanFeaturesLimits,
} from "../content";
import { notifications } from "@mantine/notifications";

function CreatePLanPage() {
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name_en: "name_en",
      description_en: "description_en",
      name: "",
      description: "",
      monthly_price: 0,
      annual_price: 0,
      is_active: false,
      is_featured: false,
      order: 0,
      settings: {
        // bio_links_limit: 0, //FIXME:  not in API
        // bio_link_blocks_per_bio_link_page_limit: 0,//FIXME:  not in API
        links_statistics_limit: 0,
        file_size: 0,
        image_size: 0,
        ///////////////
        qr_codes_limit: 0,
        customer_domains_limit: 0,
        products_limit: 0,
        video_size: 0,
        ////////////////not in design
        // links_limit: 0, ////FIXME:  not in API
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
        enabled_bio_link_blocks: bio_link_blocks,
      },
    },
    validate: zodResolver(CreatePlanSchema),
  });

  const handleSubmit = form.onSubmit(async (values: typeof form.values) => {
    try {
      await CreatePlan(values);
      form.reset();
      notifications.show({
        title: "Plan Created Successfully",
        message: `The Plan ${values.name} is created now !🌟`,
        position: "top-right",
      });
      navigate("/dashboard/plans");
    } catch (error: unknown) {
      notifications.show({
        title: "Error creating plan:",
        message:
          error?.response?.data?.message ||
          `Failed to create plan  ${values.name}.`,
        color: "red",
        position: "top-right",
      });
    }
  });

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
      </>
    );
  };

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
      <div className="w-full flex flex-wrap gap-4">
        {Object.keys(bio_link_blocks).map((key) => (
          <Switch
            className="w-[calc(50%-8px)] "
            key={form.key(`settings.enabled_bio_link_blocks.${key}`)}
            label={key}
            {...form.getInputProps(`settings.enabled_bio_link_blocks.${key}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <Text className="font-normal text-3xl ">Create New Plan</Text>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col  gap-3 px-3 "
      >
        <div className="flex flex-col gap-4">
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
        </div>
        <Stack className="mt-5 flex flex-col w-full">
          <Text className="font-normal text-xl">Plan features</Text>
          <div className="w-full flex flex-row gap-10 ">
            {PlanFeaturesLimitsElements()}
          </div>
          {/* Settings */}
          <div className="w-full flex flex-row gap-10 mt-10 ">
            {PlanFeaturesBooleanElements()}
          </div>
          {/* Biolink Blocks */}
          <div className="mt-10 w-full flex flex-col gap-4">
            <Text className="text-xl">Biolink Blocks</Text>
            {BioLinkBlocksBooleanElements()}
          </div>
        </Stack>
        <Button className="mt-5" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreatePLanPage;
