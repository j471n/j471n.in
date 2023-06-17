import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import React from "react";
import fetcher from "@lib/fetcher";
import useSWR from "swr";
import { useDarkMode } from "@context/darkModeContext";
import { getFormattedDate } from "@utils/date";

export default function GitHubActivityGraph() {
  const { isDarkMode } = useDarkMode();
  const { data: githubActivity } = useSWR(
    "/api/stats/github-contribution",
    fetcher
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={730}
        height={250}
        data={githubActivity?.contributions}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9be9a850" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#9be9a850" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="shortDate" />
        <YAxis />
        <CartesianGrid
          strokeDasharray="2 3"
          // strokeOpacity={0.5}
          stroke={isDarkMode ? "#ffffff20" : "#00000020"}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dot
          activeDot
          strokeWidth={3}
          type="monotone"
          dataKey="contributionCount"
          aria-label="count"
          stroke="#216e39"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  console.log("active", active);
  console.log("payload", payload);
  console.log("label", label);
  if (active && payload && payload.length) {
    return (
      <div className="p-5 rounded-md bg-white text-black text-sm max-w-[250px] w-fit shadow-lg">
        <p className="label">
          <span className="font-medium">Date :</span>{" "}
          {getFormattedDate(new Date(payload[0].payload.date))}
        </p>
        <p className="desc">
          <span className="font-medium">Commit Count :</span> {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};
