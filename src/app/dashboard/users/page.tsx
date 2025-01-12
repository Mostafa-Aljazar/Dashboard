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
import { useEffect, useRef, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import {
  Calendar,
  Check,
  CircleX,
  Clock9,
  EllipsisVertical,
  LogOut,
  UserPen,
  UserPlus,
  UserX,
  X,
} from "lucide-react";
import { User } from "../../../types/get-users-response";
import { formatDate } from "../../../utils/DateFormate";
import { GetUserPagination } from "../api-handlers/getUsers";
import { useDisclosure } from "@mantine/hooks";
// import { GetInterests } from "../api-handlers/getInterests";
// import { Interest } from "../../../types/get-interests-response";
// import { GetPlans } from "../api-handlers/getPlans";
// import { Plan } from "../../../types/get-plans-response";
import CreateUserModal from "./components/create-user-modal";
import { DeleteUser } from "../api-handlers/deleteUser";
import { BlockUser } from "../api-handlers/blockUser";
import EditUserModal from "./components/edit-user-modal";
import { GetUser } from "../api-handlers/getUser";

function Users() {
  const [openedCreate, handlersCreate] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [openedEdit, handlersEdit] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const idUserEdit = useRef("");

  const [activePage, setPage] = useState(1);
  const noOfPages = useRef(0);
  const noOfTotalUsers = useRef(0);
  const noOfUsersPerPage = useRef(5);

  const [users, setUsers] = useState<User[]>([]); // Define the type for users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUserPagination({
          per_page: noOfUsersPerPage.current,
          page: activePage,
        });
        // console.log("🚀 ~ GetUserData pagination:", data.pagination);
        noOfPages.current = data.pagination.last_page;
        noOfTotalUsers.current = data.pagination.total;

        // console.log("🚀 ~   noOfPages.current:", noOfPages.current);
        // setUsers(data.slice(-8).reverse()); // Get Last 8 users
        setUsers(data.data); // Get Last 8 users
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [activePage]);


  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  if (error) {
    return <Text c="red">Error: {error}</Text>;
  }

  const rows = users.map((user) => {
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
                  try {
                    const response = await DeleteUser(user.id + "");
                    console.log("🚀 ~ onClick={ ~ response:", response);
                    setLoading(false);
                  } catch (err) {
                    setError(err.message);
                    setLoading(false);
                  }
                }}
              >
                Delete User
              </Menu.Item>
              <Menu.Item
                className="text-gray-700"
                leftSection={<CircleX size={20} className="text-gray-700" />}
                onClick={async () => {
                  try {
                    const response = await BlockUser(user.id + "");
                    console.log("🚀 ~ onClick={ ~ response:", response);
                    setLoading(false);
                  } catch (err) {
                    setError(err.message);
                    setLoading(false);
                  }
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
            {activePage * noOfUsersPerPage.current > noOfTotalUsers.current
              ? noOfTotalUsers.current
              : activePage * noOfUsersPerPage.current}
          </span>{" "}
          out of <span className="font-bold"> {noOfTotalUsers.current} </span>{" "}
          results.
        </Text>

        <Pagination
          total={noOfPages.current}
          value={activePage}
          onChange={setPage}
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
