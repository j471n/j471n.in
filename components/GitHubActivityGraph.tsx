import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import AnimatedHeading from "./FramerMotion/AnimatedHeading";
import AnimatedText from "./FramerMotion/AnimatedText";
import React from "react";
import fetcher from "@lib/fetcher";
import { getFormattedDate } from "@utils/date";
import { opacityVariant } from "@content/FramerMotionVariants";
import { useDarkMode } from "@context/darkModeContext";
import useSWR from "swr";

export default function GitHubActivityGraph() {
  const { isDarkMode } = useDarkMode();
  const { data: githubActivity } = useSWR(
    "/api/stats/github-contribution",
    fetcher
  );

  return (
    <>
      <div className="font-barlow mb-10 max-w-full">
        <AnimatedHeading
          variants={opacityVariant}
          className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
        >
          GitHub Activity Graph
        </AnimatedHeading>
        <AnimatedText
          variants={opacityVariant}
          className="my-4 text-gray-700 dark:text-gray-300"
        >
          A dynamically generated activity graph to show my GitHub activities of
          last 31 days.
        </AnimatedText>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={730}
            height={250}
            data={githubActivity?.contributions}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDarkMode ? "#26a64160" : "#26a641"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={isDarkMode ? "#26a64160" : "#26a641"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="shortDate" />
            <YAxis />
            <CartesianGrid
              strokeDasharray="2 3"
              stroke={isDarkMode ? "#ffffff20" : "#00000020"}
            />
            <Tooltip content={<ContributionsToolTip />} />
            <Area
              dot
              activeDot
              strokeWidth={3}
              type="monotone"
              dataKey="contributionCount"
              aria-label="count"
              stroke={isDarkMode ? "#26a641" : "#216e39"}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="font-barlow mb-10 max-w-full">
        <AnimatedHeading
          variants={opacityVariant}
          className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
        >
          My Productivity by Day of the Week
        </AnimatedHeading>
        <AnimatedText
          variants={opacityVariant}
          className="my-4 text-gray-700 dark:text-gray-300"
        >
          A visual representation of my productivity based on the number of
          contributions made on each day of the week.
        </AnimatedText>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={730}
            height={250}
            data={githubActivity?.contributionCountByDayOfWeek}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="2 3"
              stroke={isDarkMode ? "#ffffff20" : "#00000020"}
            />
            <XAxis dataKey="day" />
            <YAxis />

            <Tooltip content={<ContributionCountByDayOfWeekToolTip />} />
            <Bar dataKey="count" fill="#26a641" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

const ContributionsToolTip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-5 rounded-md bg-white dark:bg-darkSecondary text-black dark:text-gray-200 text-sm max-w-[250px] w-fit shadow-lg">
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

const ContributionCountByDayOfWeekToolTip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-5 rounded-md bg-white dark:bg-darkSecondary text-black dark:text-gray-200 text-sm max-w-[250px] w-fit shadow-lg">
        <p className="label">
          <span className="font-medium">Day :</span> {payload[0].payload.day}
        </p>
        <p className="desc">
          <span className="font-medium">Commit Count :</span> {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};
