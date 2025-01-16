import { Button, Stack, Title } from "@mantine/core";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UsersNotifications() {
  const navigate = useNavigate();

  return (
    <Stack className="w-full flex flex-col justify-start px-5 ">
      <Title order={2} className="font-normal text-3xl">
        Create your broadcast of notifications
      </Title>

      <Button
        size="md"
        className="w-fit px-3 mr-10"
        leftSection={<CirclePlus size={14} />}
        onClick={() =>
          navigate("/dashboard/users-notifications/create-notification")
        }
      >
        Create Notification
      </Button>
    </Stack>
  );
}

export default UsersNotifications;
