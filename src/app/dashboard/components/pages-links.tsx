import { NavLink, Stack, Tooltip } from "@mantine/core";
import { dashboardLinks } from "../layout";
import { useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";

// type posistion = {
//   pos: "nav" | "aside" | undefined;
// };
function PagesLinks() {
  //   const [opened, { open, close }] = useDisclosure(false);

  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const items = dashboardLinks.map((item, index) => (
    <Tooltip label={item.label} key={item.label}>
      <NavLink
        active={index === active}
        label={
          <div className={`w-full   `}>
            {item.label}
          </div>
        }
        leftSection={<div className="">{item.icon}</div>}
        onClick={() => {
          setActive(index);
          navigate(item.link);
        }}
        color="#8938B2"
        className="rounded-lg  flex items-center justify-center max-md:bg-transparent max-md:hover:bg-transparent"
      />
    </Tooltip>
  ));

  return (
    <Stack align="flex-end" className={"bg-[#FCFCFC] pt-4  px-0 "}>
      <div className="w-full px-0 md:px-2 flex gap-4 flex-col ">{items} </div>
      {/* <div className="w-full p-0  flex gap-4 flex-col ">
        <div className="h-[2px] w-full bg-[#e0e0e0]"></div>
        <Tooltip label={"Help & getting started"}>
          <NavLink
            active={-1 === active}
            label={<div>{"Help & getting started"}</div>}
            rightSection={
              <span className=" max-md:hidden bg-[#CABDFF] text-black text-[15px] rounded-lg p-2">
                {8}
              </span>
            }
            leftSection={<HelpCircle size={18} />}
            onClick={() => {
              setActive(-1);
              navigate("help");
            }}
            color="#8938B2"
            className="rounded-lg  flex items-center justify-center max-md:bg-transparent max-md:hover:bg-transparent py-5  md:p-2"
          />
        </Tooltip>
      </div> */}
    </Stack>
  );
}

export default PagesLinks;
