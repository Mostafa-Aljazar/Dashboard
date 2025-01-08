import {
  Button,
  Drawer,
  Flex,
  Image,
  ScrollArea,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import images from "../../assets";
import {
  BellDot,
  BellRing,
  ChartSpline,
  CircleUser,
  CodeXml,
  DollarSign,
  FileCode,
  Flame,
  Globe,
  HouseIcon,
  Link,
  Logs,
  Menu,
  NotepadText,
  Palette,
  QrCode,
  Settings,
  Share,
  Tv,
} from "lucide-react";
import ProtectedRoute from "./components/protect-routes";
import { useDisclosure } from "@mantine/hooks";
import PagesLinks from "./components/pages-links";

export const dashboardLinks = [
  {
    icon: <HouseIcon size={18} />,
    label: "Dashboard",
    link: "",
  },
  {
    icon: <CircleUser size={18} />,
    label: "Users",
    link: "users",
  },
  { icon: <Logs size={18} />, label: "Users Logs", link: "users-log" },
  {
    icon: <BellRing size={18} />,
    label: "Users Notifications",
    link: "users-notifications",
  },
  { icon: <Link size={18} />, label: "Links", link: "users-links" },
  { icon: <Palette size={18} />, label: "Bio Themes", link: "bio-themes" },
  { icon: <QrCode size={18} />, label: "QR codes", link: "qr-codes" },
  { icon: <Globe size={18} />, label: "Domains", link: "domains" },
  { icon: <NotepadText size={18} />, label: "Plans", link: "plans" },
  { icon: <CodeXml size={18} />, label: "Codes", link: "codes" },
  { icon: <DollarSign size={18} />, label: "Payments", link: "payments" },
  { icon: <ChartSpline size={18} />, label: "Statistics", link: "statistics" },
  { icon: <FileCode size={18} />, label: "API Docs", link: "api-docs" },
  { icon: <Tv size={18} />, label: "Broadcasts", link: "broadcasts" },
  { icon: <Settings size={18} />, label: "Settings", link: "settings" },
];

const Dashboard_Layout = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex className="w-full min-h-screen  flex flex-col ">
      <div className="w-full flex-1 shadow-sm py-3 flex items-center justify-between   ">
        <div className="ml-4 flex gap-4 flex-row items-center justify-center">
          <Button
            variant="default"
            onClick={open}
            className="p-0 border-none hover:text-[#8938B2] ml-0 md:hidden"
          >
            <Menu size={25} />
          </Button>
          <Image
            src={images.linkatikSVG}
            alt="linkatik"
            fit="contain"
            className=" w-20 h-18 md:w-28 md:h-18 md:ml-4"
          />
        </div>
        <nav className="flex-1 bg-[#FCFCFC]   flex justify-end items-center gap-x-4 pr-4">
          <div className="max-md:hidden flex flex-row gap-x-4">
            <Button
              variant="light"
              radius="md"
              leftSection={<Flame height={19} width={16} />}
              className="w-45 h-10 px-2 py-0"
            >
              Upgrade
            </Button>
            <Button
              variant="filled"
              radius="md"
              className="w-45 h-10 px-2 py-0"
              leftSection={<Share height={15} width={18} />}
            >
              Share
            </Button>
          </div>
          <BellDot size={22} className="rounded-full  hover:cursor-pointer" />
          <Image
            src={images.man}
            alt="man"
            className="rounded-full w-12 h-12  hover:cursor-pointer"
          />
        </nav>
      </div>

      <Drawer
        size={"300px"}
        opened={opened}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div className="w-full px-0 flex gap-4 flex-col ">
          <div className="w-full justify-around flex flex-row gap-x-3">
            <Button
              variant="light"
              radius="md"
              leftSection={<Flame height={19} width={16} />}
              className="  text-lg"
              size="sm"
            >
              Upgrade
            </Button>
            <Button
              size="sm"
              variant="filled"
              radius="md"
              className=" text-lg"
              leftSection={<Share height={15} width={18} />}
            >
              Share
            </Button>
          </div>
          <PagesLinks pos={"nav"} />
        </div>
      </Drawer>
      <div className="flex flex-row">
        <PagesLinks pos="aside" />
        <Flex direction={"column"} className="w-full  flex-1 flex-grow  ">
          <ProtectedRoute />
          <div className="flex justify-center ">
            <Outlet />
          </div>
        </Flex>
      </div>
    </Flex>
  );
};

export default Dashboard_Layout;
