import { LoadingOverlay, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { GetStatisticsData } from "../../api-handlers/getStatistics";
import { GetStatisticsResponse } from "../../../../types/get-statistics-response";
import {
  MousePointer,
  ScanQrCode,
  ShoppingBag,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

function LifetimeAnalytics() {
  const [statistics, setStatistics] = useState<GetStatisticsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetStatisticsData();
        setStatistics(data); // Assuming the API returns an array of users
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

  console.log("statistics : ", statistics);

  const StatisticsData = [
    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <ShoppingBag />
        </div>
      ),
      label: "Bio Links Pages",
      data: statistics?.data.page_views,
    },
    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <MousePointer />
        </div>
      ),
      label: "Pageviews Tracked",
      data: statistics?.data.page_views,
    },
    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <ScanQrCode />
        </div>
      ),
      label: "QR codes",
      data: statistics?.data.qr,
    },
    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <UserRound />
        </div>
      ),
      label: "Users",
      data: statistics?.data.users,
    },
    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <ShoppingBag />
        </div>
      ),
      label: "Revenue",
      data: statistics?.data.revenue,
    },

    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <MousePointer />
        </div>
      ),
      label: "Domains",
      data: statistics?.data.domains,
    },

    {
      icon: (
        <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 bg-[#4ACF70]">
          <UserRoundCheck />
        </div>
      ),
      label: "Subscribers",
      data: statistics?.data.subscriber,
    },
  ];
  return (
    <div className="flex flex-col gap-4 pt-10 ">
      <div className="flex flex-row gap-3 p-5">
        <div className="w-4 h-8 bg-[#FFBC99] rounded-md "></div>
        <Title order={4} className="font-normal text-[20px]">
          Lifetime Analytics
        </Title>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4  bg-[#F4F4F4]    rounded-lg p-8 ">
        {StatisticsData.map((item, index) => {
          return (
            <div
              className={`   flex flex-row justify-evenly gap-3  p-2 rounded-lg 
                ${index == 0 ? "bg-[#FCFCFC] shadow-lg" : ""}`}
            >
              <div className="">{item.icon}</div>

              <div className="flex-1 flex flex-col  items-start">
                <div className="text-[#6F767E] text-sm">{item.label}</div>
                <div className="text-5xl">{item.data}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LifetimeAnalytics;
