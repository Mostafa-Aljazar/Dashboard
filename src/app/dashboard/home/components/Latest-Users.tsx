import { ScrollArea, Table, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { GetUserData } from "../../api-handlers/getUsers";
import { LoadingOverlay } from "@mantine/core";
import { formatDate } from "../../../../utils/DateFormate";
import { Check, X } from "lucide-react";
import { User } from "../../../../types/get-user-response";

function LatestUsers() {
  const [users, setUsers] = useState<User[]>([]); // Define the type for users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUserData();
        setUsers(data); // Assuming the API returns an array of users
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {user.plan.name}
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
            <X />
            <X />
            <X />
            <X />
            <X />
            <X />
          </div>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div className="pt-10 ">
      <div className="flex flex-row gap-3 py-4">
        <div className="w-4 h-8 bg-[#FFBC99] rounded-md "></div>
        <Title order={4} className="font-normal text-[20px]">
          Latest Users
        </Title>
      </div>

      <ScrollArea className="w-full px-4">
        <Table
          verticalSpacing={"xs"}
          highlightOnHover
          highlightOnHoverColor="#f6f6f6"
          className="text-sm rounded-md bg-white min-w-[400px]"
        >
          <Table.Thead>
            <Table.Tr className="bg-white">
              <Table.Th>User</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Plan</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Details</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default LatestUsers;
