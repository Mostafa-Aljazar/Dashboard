import { Flex, Title } from "@mantine/core";
import LifetimeAnalytics from "./components/Lifetime-Analytics";
import LatestUsers from "./components/Latest-Users";

function Dashboard() {
  return (
    <Flex direction={"column"} className="w-full ">
      <Title order={1} className="font-normal text-2xl md:text-4xl">
        Dashboard
      </Title>
      <LifetimeAnalytics />
      <LatestUsers />
    </Flex>
  );
}

export default Dashboard;
