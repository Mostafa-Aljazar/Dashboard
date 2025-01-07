import { Button, Flex, Image, NavLink, Stack } from "@mantine/core";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  HelpCircle,
  HouseIcon,
  Link,
  Logs,
  NotepadText,
  Palette,
  QrCode,
  Settings,
  Share,
  Tv,
} from "lucide-react";
import ProtectedRoute from "./components/protect-routes";

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
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const items = dashboardLinks.map((item, index) => (
    <NavLink
      title={item.label}
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={item.icon}
      onClick={() => {
        setActive(index);
        navigate(item.link);
      }}
      color="#8938B2"
      className="rounded-xl"
    />
  ));

  return (
    <Flex className="w-full min-h-screen  flex flex-row ">
      <Stack align="center" w={"340px"} className={"bg-[#FCFCFC]"}>
        <div className="w-[164px] h-[61px] my-7 ">
          <Image
            src={images.linkatikSVG}
            alt="linkatik"
            w="auto"
            fit="contain"
          />
        </div>

        <div className="w-full px-4 flex gap-4 flex-col ">{items} </div>
        <div className="w-full p-4  flex gap-4 flex-col ">
          <div className="h-[2px] w-full bg-[#F4F4F4]"></div>
          <NavLink
            // href="#required-for-focus "
            active={-1 === active}
            label={"Help & getting started"}
            rightSection={
              <span className="bg-[#CABDFF] text-black text-[15px] rounded-lg p-2">
                {8}
              </span>
            }
            leftSection={<HelpCircle size={18} />}
            onClick={() => {
              setActive(-1);
              navigate("help");
            }}
            color="#8938B2"
            style={{
              borderRadius: "10px",
              borderTop: "10px",
              borderColor: "red",
              borderTopWidth: "10px",
            }}
          />
        </div>
      </Stack>

      <Flex direction={"column"} className="w-full  flex-1 flex-grow  ">
        <nav className=" bg-[#FCFCFC] h-24 w-full flex justify-end items-center gap-4 pr-4">
          <Button
            variant="light"
            radius="md"
            leftSection={<Flame height={19} width={16} />}
            className="w-[121px]"
          >
            Upgrade
          </Button>
          <Button
            variant="filled"
            radius="md"
            leftSection={<Share height={15} width={18} />}
          >
            Share
          </Button>
          <BellDot size={22} className="rounded-full  hover:cursor-pointer" />
          <Image
            src={images.man}
            alt="man"
            className="rounded-full w-12 h-12 hover:cursor-pointer"
          />
        </nav>
        <ProtectedRoute />
        <div className="flex justify-center px-8">
          <Outlet />
        </div>
      </Flex>
    </Flex>
  );
};

export default Dashboard_Layout;
