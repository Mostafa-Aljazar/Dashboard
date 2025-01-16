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
import { useEffect } from "react";
import { GetPlansResponse } from "../../../../types/get-plans-response";
import { GetPlans } from "../../api-handlers/getPlans";
import { GetInterests } from "../../api-handlers/getInterests";
import { GetInterestsResponse } from "../../../../types/get-interests-response";
import { useForm, zodResolver } from "@mantine/form";
import { CreateUserSchema } from "../../../../validation/create-user-schema";
import { GetUser } from "../../api-handlers/getUser";
import { UpdateUser } from "../../api-handlers/updateUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUserResponse } from "../../../../types/get-user-response";
import { notifications } from "@mantine/notifications";

function EditUserModal({
  userId,
  opened,
  onClose,
}: {
  userId: string;
  opened: boolean;
  onClose: () => void;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      is_active: true,
      email: "",
      interest_id: "",
      name: "",
      password: "",
      plan_id: 0,
      plan_period: "monthly",
      sub_interest_id: "",
      username: "",
    },
    validate: zodResolver(CreateUserSchema),
  });

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

  const { data: userData, isLoading: userLoading } = useQuery<
    GetUserResponse,
    Error,
    GetUserResponse,
    string[]
  >({
    queryKey: ["user", userId],
    queryFn: () => GetUser(userId),
    enabled: !!userId, // Only run the query if userId is available
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: typeof form.values) => UpdateUser(userId, values),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"], userId });
      notifications.show({
        title: "Success ~ 🚀",
        message: `User Updated successfully! 🌟`,
        position: "top-right",
      });
      form.reset();
      onClose();
    },
    onError: () => {
      notifications.show({
        title: "Error ~ 🚀",
        message: `Failed to update user. Please try again.! \n ${updateUserMutation.error?.message} `,
        position: "top-right",
        color: "red",
      });
    },
  });

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    updateUserMutation.mutate({ ...values });
  });

  useEffect(() => {
    if (userData) {
      form.setValues({
        is_active: userData?.data?.is_active === 1,
        email: userData?.data?.email || "",
        name: userData?.data?.name || "",
        plan_id: userData?.data?.plan?.id || 0,
        username: userData?.data?.username || "",
        // interest_id: "",
        // password: userData?.data?. || "",
        plan_period: "monthly",
        // sub_interest_id: "",
        // username: "",
      });
    }
  }, [userData]);

  if (userLoading || plansLoading || interestsLoading) {
    return <LoadingOverlay visible={true} />;
  }

  if (plansError || interestsError) {
    return (
      <Text c="red">
        Error: {plansError?.message || interestsError?.message}
      </Text>
    );
  }

  // const handleSubmit2 = form.onSubmit(async (values: typeof form.values) => {
  //   console.log("🚀 ~ handleSubmit ~ values:", values);
  //   try {
  //     const response = await UpdateUser(userId, values);
  //     console.log("User Updated Successfully:", response);
  //     alert("User Updated successfully!");
  //     form.reset();
  //     onClose();
  //   } catch (error: unknown) {
  //     console.error(
  //       "Error Updating user:",
  //       error?.response?.data || error?.message
  //     );
  //     alert("Failed to update user. Please try again.");
  //   }
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [plansResponse, interestsResponse, userResponse] =
  //         await Promise.all([GetPlans(), GetInterests(), GetUser(userId)]);

  //       if (userResponse && userResponse?.success) {
  //         form.setValues({
  //           is_active: userResponse?.data?.is_active == 1 ? true : false,
  //           email: userResponse?.data?.email || "",
  //           name: userResponse?.data?.name || "",
  //           plan_id: userResponse?.data?.plan?.id || 0,
  //           username: userResponse?.data?.username || "",
  //         });
  //       }

  //       // console.log("🚀Promise ~ GetPlans ~:", plansResponse.data);
  //       setPlansData(plansResponse.data);

  //       // console.log("🚀Promise ~ GetInterests ~:", interestsResponse.data);
  //       setInterestData(interestsResponse.data);

  //       setLoading(false);
  //     } catch (err: unknown) {
  //       setError(err?.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [opened]);

  // if (loading) {
  //   return <LoadingOverlay visible={true} />;
  // }

  // if (error) {
  //   return <Text c="red">Error: {error}</Text>;
  // }

  return (
    <>
      <Modal
        size={"xl"}
        opened={opened}
        onClose={onClose}
        title={
          <Text className="font-semibold" size="lg" pl={10}>
            Edit User
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
                Edit User
              </Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export default EditUserModal;
