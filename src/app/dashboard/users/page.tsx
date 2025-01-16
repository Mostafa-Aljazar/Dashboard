import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Pagination,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useRef, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import {
  Check,
  CircleX,
  EllipsisVertical,
  LogOut,
  UserPen,
  UserPlus,
  UserX,
  X,
} from "lucide-react";
import { formatDate } from "../../../utils/DateFormate";
import { GetUserPagination } from "../api-handlers/getUsers";
import { useDisclosure } from "@mantine/hooks";

import CreateUserModal from "./components/create-user-modal";
import { DeleteUser } from "../api-handlers/deleteUser";
import { BlockUser } from "../api-handlers/blockUser";
import EditUserModal from "./components/edit-user-modal";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

function Users() {
  const [openedCreate, handlersCreate] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [openedEdit, handlersEdit] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const queryClient = useQueryClient();
  const idUserEdit = useRef("");
  const [activePage, setActivePage] = useState(1);
  const noOfUsersPerPage = useRef(5);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", activePage],
    queryFn: () =>
      GetUserPagination({
        per_page: 15,
        page: activePage,
      }),
    placeholderData: keepPreviousData, // Use keepPreviousData here
  });

  const deleteMutation = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // console.log("🚀 ~ Delete User Successfully");
      notifications.show({
        title: "Success ~ 🚀",
        message: `The User has been deleted! 🌟`,
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error ~ 🚀",
        message: `The User cannot be deleted.! \n ${deleteMutation.error?.message} `,
        position: "top-right",
        color: "red",
      });
    },
  });

  const blockMutation = useMutation({
    mutationFn: BlockUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // console.log("🚀 ~ Block User Successfully");
      notifications.show({
        title: "Success ~ 🚀",
        message: `The User has been blocked/unblocked! 🌟`,
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error ~ 🚀",
        message: `The User cannot be blocked/unblocked.! \n ${blockMutation.error?.message} `,
        position: "top-right",
        color: "red",
      });
    },
  });

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return <Text color="red">Error: {error?.message}</Text>;
  }

  const users = data?.data;
  const totalPages = data?.pagination?.last_page || 0;
  const totalUsers = data?.pagination?.total || 0;

  const rows = users?.map((user) => {
    const { date, time } = formatDate(user?.created_at.toString());

    return (
      <Table.Tr key={user.id} className="border-b-[#EFEFEF]">
        <Table.Td>
          <div className="flex flex-col">
            <span className="text-[#454545] text-sm">{user.name}</span>
            <span>{user.email}</span>
          </div>
        </Table.Td>
        <Table.Td>
          {user.is_active ? (
            <Text
              variant="filled"
              className=" text-[#78A58C] bg-[#B5E4CA] flex flex-row gap-1 p-1 w-20 md:gap-3 md:w-28 rounded-lg items-center"
            >
              <Check size={20} strokeWidth={2} absoluteStrokeWidth />
              <span className="">Active</span>
            </Text>
          ) : (
            <Text
              variant="filled"
              className=" text-[#a57878] bg-[#e4b5b5] flex flex-row gap-3 p-1 w-28 rounded-lg items-center"
            >
              <X size={14} />
              <span className="text-sm">Not Active</span>
            </Text>
          )}
        </Table.Td>
        <Table.Td>
          <span className="text-black px-4 py-1 rounded-md bg-[#CABDFF] text-base">
            {user.plan?.name}
          </span>
        </Table.Td>
        <Table.Td>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[#FF6A55] text-sm">{date}</span>
            <span className="text-[#FF6A55] text-xs">{time}</span>
          </div>
        </Table.Td>
        <Table.Td>
          <div className="flex flex-row flex-wrap items-center justify-evenly">
            <Tooltip label={"Login Type"} position="top" offset={-5}>
              <ActionIcon
                bg={""}
                className="border-none"
                variant="default"
                size="lg"
                radius="xl"
                aria-label="Settings"
              >
                <LogOut size={20} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label={"login to user page"} position="top" offset={-5}>
              <ActionIcon
                bg={""}
                className="border-none"
                variant="default"
                size="lg"
                radius="xl"
                aria-label="Settings"
              >
                <UserPlus size={20} />
              </ActionIcon>
            </Tooltip>
          </div>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={250} position="top">
            <Menu.Target>
              <ActionIcon variant="transparent" aria-label="Settings">
                <EllipsisVertical className="text-[#6F767E]" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label className="text-base">Actions</Menu.Label>
              <Menu.Item
                className="text-gray-700"
                leftSection={<UserX size={20} className="text-gray-700" />}
                onClick={async () => {
                  deleteMutation.mutate(user.id + "");
                }}
              >
                Delete User
              </Menu.Item>
              <Menu.Item
                className="text-gray-700"
                leftSection={<CircleX size={20} className="text-gray-700" />}
                onClick={async () => {
                  blockMutation.mutate(user.id + "");
                }}
              >
                Block User
              </Menu.Item>

              <Menu.Item
                className="text-gray-700"
                leftSection={<UserPen size={20} className="text-gray-700" />}
              >
                <div
                  onClick={() => {
                    idUserEdit.current = `${user.id}`;
                    handlersEdit.open();
                  }}
                >
                  Edit User
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div className="w-full flex flex-col">
      <Group justify="space-between">
        <Title order={1} className="font-normal text-2xl md:text-4xl">
          Users
        </Title>
        <>
          <Button
            size="sm"
            className="px-3 mr-10"
            leftSection={<UserPlus size={14} />}
            onClick={handlersCreate.open}
          >
            Create User
          </Button>
        </>
      </Group>

      <div className="rounded-lg mt-9 p-15 bg-[#FCFCFC]">
        <Table.ScrollContainer
          className="rounded-lg p-5  w-full bg-white"
          minWidth={600}
        >
          <Table
            verticalSpacing={"xs"}
            highlightOnHover
            highlightOnHoverColor="#f6f6f6"
          >
            <Table.Thead>
              <Table.Tr className="bg-white">
                <Table.Th>User</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Plan</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Details</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>

      <Group justify="space-between" className="px-5">
        <Text className="text-[#8938B2] text-sm">
          Showing{" "}
          <span className="font-bold">
            {(activePage - 1) * noOfUsersPerPage.current + 1} -{" "}
            {Math.min(activePage * noOfUsersPerPage.current, totalUsers)}
          </span>{" "}
          out of <span className="font-bold">{totalUsers}</span> results.
        </Text>

        <Pagination
          total={totalPages}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
        />
      </Group>

      <>
        <EditUserModal
          userId={idUserEdit.current}
          opened={openedEdit}
          onClose={handlersEdit.close}
        />
        <CreateUserModal opened={openedCreate} onClose={handlersCreate.close} />
      </>
    </div>
  );
}

export default Users;
