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
import { useEffect, useState } from "react";
import { Plan } from "../../../../types/get-plans-response";
import { GetPlans } from "../../api-handlers/getPlans";
import { GetInterests } from "../../api-handlers/getInterests";
import { Interest } from "../../../../types/get-interests-response";
import { useForm, zodResolver } from "@mantine/form";
import { CreateUserSchema } from "../../../../validation/create-user-schema";
import { CreateUser } from "../../api-handlers/createUser";
// import { CreateUser } from "../../api-handlers/createUser";
// import axios from "axios";

function CreateUserModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [PlansData, setPlansData] = useState<Plan[]>([]);
  const [InterestData, setInterestData] = useState<Interest[]>([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      is_active: true,
      email: "",
      interest_id: InterestData[0]?.id + "",
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

  const handleSubmit = form.onSubmit(async (values: typeof form.values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      const response = await CreateUser(values);
      console.log("User Created Successfully:", response);
      alert("User created successfully!");
      form.reset();
      onClose()
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
      alert("Failed to create user. Please try again.");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansResponse, interestsResponse] = await Promise.all([
          GetPlans(),
          GetInterests(),
        ]);

      
        // console.log("🚀Promise ~ GetPlans ~:", plansResponse.data);
        setPlansData(plansResponse.data);

        // console.log("🚀Promise ~ GetInterests ~:", interestsResponse.data);
        setInterestData(interestsResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  if (error) {
    return <Text c="red">Error: {error}</Text>;
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
              defaultValue={InterestData[0].id + ""}
              //   value={value}
              //   onChange={(event) => setValue(event.currentTarget.value)}
              data={InterestData.map((item) => {
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
              // value={value}
              //   onChange={(event) => setValue(event.currentTarget.value)}
              data={InterestData.map((item) => {
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
                {PlansData.map((plan, index) => {
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
