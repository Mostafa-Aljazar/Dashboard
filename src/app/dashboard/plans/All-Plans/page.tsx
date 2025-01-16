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
// import {
//   Check,
//   CircleX,
//   EllipsisVertical,
//   LogOut,
//   UserPen,
//   UserPlus,
//   UserX,
//   X,
// } from "lucide-react";
// import { User } from "../../../types/get-users-response";
// import { formatDate } from "../../../utils/DateFormate";
// import { GetUserPagination } from "../api-handlers/getUsers";
// import { useDisclosure } from "@mantine/hooks";
// import CreateUserModal from "./components/create-user-modal";
// import { DeleteUser } from "../api-handlers/deleteUser";
// import { BlockUser } from "../api-handlers/blockUser";
// import EditUserModal from "./components/edit-user-modal";
import { Plan } from "../../../../types/get-plans-response";
import { GetPlans } from "../../api-handlers/getPlans";
import {
  EllipsisVertical,
  Eye,
  EyeOff,
  NotebookPen,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { replace, useNavigate } from "react-router-dom";
import { DeletePlan } from "../../api-handlers/deletePlan";

function Plans() {
  // const [openedCreate, handlersCreate] = useDisclosure(false, {
  //   onOpen: () => console.log("Opened"),
  //   onClose: () => console.log("Closed"),
  // });
  // const [openedEdit, handlersEdit] = useDisclosure(false, {
  //   onOpen: () => console.log("Opened"),
  //   onClose: () => console.log("Closed"),
  // });

  // const idUserEdit = useRef("");

  // const [activePage, setPage] = useState(1);
  // const noOfPages = useRef(0);
  // const noOfTotalUsers = useRef(0);
  // const noOfUsersPerPage = useRef(5);

  const navigate = useNavigate();
  const [idPlanDeleted, setIdPlanDeleted] = useState("");

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPlans();
        console.log("🚀 ~ GetPlans:", response);

        setPlans(response.data);
        setLoading(false);
      } catch (err: unknown) {
        setError(err?.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [idPlanDeleted]);

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  if (error) {
    return <Text c="red">Error: {error}</Text>;
  }

  const rows = plans.map((plan) => {
    return (
      <Table.Tr key={plan.id} className="border-b-[#EFEFEF]">
        {/* name */}
        <Table.Td>
          <div className="">
            <span className="text-[#454545] text-sm">{plan.name}</span>
          </div>
        </Table.Td>
        {/* price */}
        <Table.Td>
          <div className="flex flex-col">
            {plan.monthly_price ? (
              <span className="text-[#454545] text-sm">
                {plan.monthly_price}$ Monthly
              </span>
            ) : (
              <>-</>
            )}
            {plan.annual_price ? (
              <span className="text-[#454545] text-sm">
                {plan.annual_price}$ Annual
              </span>
            ) : (
              <>-</>
            )}
          </div>
        </Table.Td>
        {/* order */}
        <Table.Td className="w-fit">{plan?.order}</Table.Td>
        {/* users */}
        <Table.Td>
          <Text
            variant="text"
            className=" text-[#606060] bg-[#D0D0D0] w-fit flex flex-row items-center justify-center gap-1 py-0.5 px-3  rounded-md  "
          >
            <Users size={15} strokeWidth={2} absoluteStrokeWidth />
            <span className="text-sm">
              {plan?.users_count ? <>{plan?.users_count}</> : "-"}
            </span>
          </Text>
        </Table.Td>
        {/* Status */}
        <Table.Td>
          {plan.is_active ? (
            <Text
              variant="filled"
              className=" text-[#316634] bg-[#C4E8CA] w-fit flex flex-row items-center justify-center gap-2 px-3   rounded-md "
            >
              <Eye size={15} strokeWidth={2} absoluteStrokeWidth />
              <span className="">Active</span>
            </Text>
          ) : (
            <Text
              variant="filled"
              className=" text-[#7A5A1B]  bg-[#FCECAD] w-fit flex flex-row items-center justify-center gap-2 px-3   rounded-md"
            >
              <EyeOff size={15} strokeWidth={2} absoluteStrokeWidth />
              <span className="text-sm">Disabled</span>
            </Text>
          )}
        </Table.Td>
        {/* delete & update */}
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
                leftSection={<Trash size={20} className="text-gray-700" />}
                onClick={async () => {
                  try {
                    const response = await DeletePlan(plan.id);
                    console.log(
                      `🚀 ~ onClick={ ~ DeletePlan ${plan.id}:`,
                      response
                    );
                    setIdPlanDeleted(plan.id + "");
                    setLoading(false);
                  } catch (err: unknown) {
                    setError(err?.message);
                    setLoading(false);
                  }
                }}
              >
                Delete Plan
              </Menu.Item>

              <Menu.Item
                className="text-gray-700"
                leftSection={
                  <NotebookPen size={20} className="text-gray-700" />
                }
                onClick={() => {
                  navigate(`/dashboard/plans/edit-plan/${plan.id}`);
                }}
              >
                <div
                // onClick={() => {
                //   idUserEdit.current = `${user.id}`;
                //   handlersEdit.open();
                // }}
                >
                  Edit Plan
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
          Plans
        </Title>
        <>
          <Button
            size="sm"
            className="px-3 mr-10"
            leftSection={<UserPlus size={14} />}
            onClick={() => navigate("/dashboard/plans/create-plan")}
          >
            Create Plans
          </Button>
        </>
      </Group>

      <div className="rounded-lg mt-14 p-15 bg-[#FCFCFC]">
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
                <Table.Th>Plan Name</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Order</Table.Th>
                <Table.Th>Users</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>

      {/*
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
      </> */}
    </div>
  );
}

export default Plans;
