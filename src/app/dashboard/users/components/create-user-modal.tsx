import {
  Button,
  CheckIcon,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  NativeSelect,
  PasswordInput,
  Radio,
  ScrollArea,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { GetPlansResponse } from "../../../../types/get-plans-response";
import { GetPlans } from "../../api-handlers/getPlans";
import { GetInterests } from "../../api-handlers/getInterests";
import { GetInterestsResponse } from "../../../../types/get-interests-response";
import { useForm, zodResolver } from "@mantine/form";
import { CreateUserSchema } from "../../../../validation/create-user-schema";
import { CreateUser } from "../../api-handlers/createUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

function CreateUserModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    data: plansData,
    isLoading: plansLoading,
    error: plansError,
  } = useQuery<GetPlansResponse, Error, GetPlansResponse, string[]>({
    queryKey: ["plans"],
    queryFn: GetPlans,
  });

  const {
    data: interestsData,
    isLoading: interestsLoading,
    error: interestsError,
  } = useQuery<GetInterestsResponse, Error, GetInterestsResponse, string[]>({
    queryKey: ["interests"],
    queryFn: GetInterests,
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      is_active: true,
      email: "",
      interest_id: interestsData?.data[0]?.id + "",
      name: "",
      password: "",
      plan_id: 0,
      plan_period: "monthly",
      sub_interest_id: "",
      username: "",
    },
    // in:monthly,annually

    validate: zodResolver(CreateUserSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: CreateUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({
        title: "Success ~ 🚀",
        message: `User created successfully! 🌟`,
        position: "top-right",
      });
      form.reset();
      onClose();
    },
    onError: () => {
      notifications.show({
        title: "Error ~ 🚀",
        message: `Failed to create user. Please try again.! \n ${createUserMutation.error?.message} `,
        position: "top-right",
        color: "red",
      });
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    createUserMutation.mutate(values);
  });

  if (plansLoading || interestsLoading) {
    return <LoadingOverlay visible={true} />;
  }

  if (plansError || interestsError) {
    return (
      <Text c="red">
        Error: {plansError?.message || interestsError?.message}
      </Text>
    );
  }

  return (
    <>
      <Modal
        size={"xl"}
        opened={opened}
        onClose={onClose}
        title={
          <Text className="font-semibold" size="lg" pl={10}>
            Create New User
          </Text>
        }
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <form onSubmit={handleSubmit}>
          <Flex
            className="w-full"
            align={"flex-start"}
            direction={"column"}
            gap={"md"}
            p={20}
            pt={0}
          >
            <TextInput
              label={
                <Text className="text-sm font-semibold inline-block">
                  Name:
                </Text>
              }
              withAsterisk
              placeholder="name..."
              className="w-full"
              size="sm"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              type="email"
              label={
                <Text className="text-sm  font-semibold inline-block">
                  Email:
                </Text>
              }
              withAsterisk
              placeholder="user@example.com"
              className="w-full"
              size="sm"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label={
                <Text className="text-sm font-semibold inline-block">
                  Password:
                </Text>
              }
              withAsterisk
              placeholder="password..."
              className="w-full"
              size="sm"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <TextInput
              type="username"
              label={
                <Text className="text-sm font-semibold inline-block">
                  Username:
                </Text>
              }
              withAsterisk
              placeholder="@username"
              className="w-full"
              size="sm"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
            <Switch
              className="w-fit"
              label={
                <Text className="text-base font-semibold" size="xs">
                  Active
                </Text>
              }
              key={form.key("is_active")}
              {...form.getInputProps("is_active")}
            />
            <Radio.Group
              defaultValue="monthly"
              name="plan_period"
              label={
                <Text className="text-sm font-semibold inline-block">
                  The Plan period :
                </Text>
              }
              withAsterisk
              className=" gap-10 flex flex-row justify-between  "
              key={form.key("plan_period")}
              {...form.getInputProps("plan_period")}
            >
              <Group>
                <Radio icon={CheckIcon} value="monthly" label="monthly" />
                <Radio icon={CheckIcon} value="annually" label="annually" />
              </Group>
            </Radio.Group>{" "}
            <NativeSelect
              label={<Text className="text-sm font-semibold">Interests:</Text>}
              variant="filled"
              className="w-full"
              defaultValue={interestsData?.data[0].id + ""}
              //   value={value}
              //   onChange={(event) => setValue(event.currentTarget.value)}
              data={interestsData?.data.map((item) => {
                return { label: item.title, value: `${item.id}` };
              })}
              key={form.key("interest_id")}
              {...form.getInputProps("interest_id")}
            />
            <NativeSelect
              label={
                <Text className="text-sm font-semibold">Sub Interests:</Text>
              }
              variant="filled"
              className="w-full"
              data={interestsData?.data.map((item) => {
                return { label: item.title, value: `${item.id}` };
              })}
              key={form.key("sub_interest_id")}
              {...form.getInputProps("sub_interest_id")}
            />
            <Radio.Group
              name="plan"
              label={
                <Text className="text-sm font-semibold inline-block">
                  The Plan :
                </Text>
              }
              withAsterisk
              className=" gap-10 flex flex-row justify-between  "
              key={form.key("plan_id")}
              {...form.getInputProps("plan_id")}
            >
              <Group>
                {plansData?.data.map((plan, index) => {
                  return (
                    <Radio
                      key={index}
                      icon={CheckIcon}
                      value={Number(plan.id) + ""}
                      label={plan.name}
                    />
                  );
                })}
              </Group>
            </Radio.Group>
            <Group justify="flex-end" mt="md" className="w-full">
              <Button className="w-full" type="submit">
                Create User
              </Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export default CreateUserModal;
