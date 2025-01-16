import {
  Button,
  LoadingOverlay,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CreatePlanSchema } from "../../../../validation/create-plan-schema";
import {
  bio_link_blocks,
  PlanFeaturesBoolean,
  PlanFeaturesLimits,
} from "../content";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetPlansPagination } from "../../api-handlers/getPlans";
import { UpdatePlan } from "../../api-handlers/updatePlan";
import { notifications } from "@mantine/notifications";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

function EditPLanPage() {
  const { id } = useParams<{ id: string }>();

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

  const queryClient = useQueryClient();

  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: () =>
      GetPlansPagination({
        per_page: 1000000,
        page: 1,
      }),
    placeholderData: keepPreviousData, // Use keepPreviousData here
  });

  const planEdit = plans?.data.find((plan) => plan.id.toString() === id);

  const updatePlanMutation = useMutation({
    mutationFn: (values: typeof form.values) => UpdatePlan(`${id}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], id });
      form.reset();
      notifications.show({
        title: "Plan Updated Successfully",
        message: `The plan has been updated successfully.`,
        color: "blue",
        position: "top-right",
      });
      navigate("/dashboard/plans");
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message:
          updatePlanMutation.error?.message || "Failed to update the plan.",
        color: "red",
        position: "top-right",
      });
    },
  });

  useEffect(() => {
    if (planEdit) {
      // Merge defaults with API values
      const mergedBioLinkBlocks = {
        ...bio_link_blocks, // Default values
        ...planEdit.settings.enabled_bio_link_blocks, // Overwrite with API values
      };

      form.setValues({
        name_en: planEdit.name_en || "name_en",
        description_en: planEdit.description_en || "description_en",
        name: planEdit.name,
        description: planEdit.description,
        monthly_price: planEdit.monthly_price,
        annual_price: planEdit.annual_price,
        is_active: planEdit.is_active,
        is_featured: planEdit.is_featured,
        order: planEdit.order,
        settings: {
          ...planEdit.settings,
          enabled_bio_link_blocks: mergedBioLinkBlocks,
        },
      });
    }
  }, [planEdit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingOverlay visible={true} />
        <Text>Loading plan details...</Text>
      </div>
    );
  }

  if (isError) {
    return <Text color="red">Error: {error.message}</Text>;
  }

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
                // {...form.getInputProps(item.formKey)}
                {...form.getInputProps(item.formKey, { type: "checkbox" })}
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
            {...form.getInputProps(`settings.enabled_bio_link_blocks.${key}`, {
              type: "checkbox",
            })}
            // {...form.getInputProps(item.formKey, { type: "checkbox" })}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    console.log("🚀 ~ EditPLanPage ~ values:", values);
    return updatePlanMutation.mutate(values);
  });

  return (
    <div className="w-full flex flex-col">
      <Text className="font-normal text-3xl ">Edit Plan {planEdit?.id}</Text>
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
            {...form.getInputProps("is_active", { type: "checkbox" })}
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
          {/* Bio link Blocks */}
          <div className="mt-10 w-full flex flex-col gap-4">
            <Text className="text-xl">Bio link Blocks</Text>
            {BioLinkBlocksBooleanElements()}
          </div>
        </Stack>
        <Button className="mt-5" type="submit">
          Update Plan
        </Button>
      </form>
    </div>
  );
}

export default EditPLanPage;
