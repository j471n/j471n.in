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

import { motion } from "framer-motion";
import React from "react";
import fetcher from "@lib/fetcher";
import { useDarkMode } from "@context/darkModeContext";
import useSWR from "swr";

/* ── Types ── */
interface PersonalBest {
  wpm: number;
  acc: number;
  consistency: number;
  raw: number;
  timestamp: number;
  language: string;
  difficulty: string;
}

interface TrendPoint {
  index: number;
  wpm: number;
  raw: number;
  acc: number;
  mode: string;
  timestamp: number;
}

interface MonkeyTypeData {
  personalBests: {
    time15: PersonalBest | null;
    time30: PersonalBest | null;
    time60: PersonalBest | null;
  };
  stats: {
    completedTests: number;
    startedTests: number;
    timeTyping: number;
  };
  streak: {
    length: number;
    maxLength: number;
  };
  lastResult: any | null;
  averages: {
    wpm: number;
    acc: number;
    consistency: number;
  } | null;
  trendResults: TrendPoint[];
  leaderboardRank: number | null;
}

/* ── Helpers ── */
function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ── Animation variants ── */
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ── Stat Card ── */
function MonkeyStatsCard({
  title,
  value,
}: {
  title: string;
  value: string | null | undefined;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex flex-col justify-center p-5 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-black/20 transition-colors duration-200"
    >
      <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-gray-500 dark:text-gray-500 mb-2">
        {title}
      </p>
      <div className="text-3xl font-black text-gray-900 dark:text-white leading-none">
        {value ?? (
          <div className="h-7 w-20 bg-gray-200 dark:bg-neutral-700 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}

/* ── Section heading ── */
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 space-y-3">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ── Chart section heading ── */
function ChartSectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 space-y-2">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
          Typing
        </span>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        {description}
      </motion.p>
    </div>
  );
}

/* ── Personal best detail card ── */
function PersonalBestCard({
  mode,
  pb,
}: {
  mode: string;
  pb: PersonalBest | null | undefined;
}) {
  if (!pb) {
    return (
      <div className="bg-white dark:bg-darkPrimary border border-gray-200 dark:border-darkSecondary p-6">
        <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-gray-500 dark:text-gray-500 mb-4">
          {mode}
        </p>
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-gray-200 dark:bg-neutral-700 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const rows = [
    { label: "Raw WPM", value: Math.round(pb.raw) },
    { label: "Accuracy", value: `${Math.round(pb.acc * 100) / 100}%` },
    {
      label: "Consistency",
      value: `${Math.round(pb.consistency * 100) / 100}%`,
    },
    { label: "Language", value: pb.language },
    { label: "Date", value: formatDate(pb.timestamp) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-darkPrimary border border-gray-200 dark:border-darkSecondary"
    >
      <div className="p-5 border-b border-gray-200 dark:border-darkSecondary">
        <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-gray-500 dark:text-gray-500 mb-2">
          {mode}
        </p>
        <p className="text-4xl font-black text-gray-900 dark:text-white leading-none">
          {Math.round(pb.wpm)}
          <span className="text-sm font-mono font-normal text-gray-400 dark:text-gray-500 ml-1.5">
            wpm
          </span>
        </p>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-neutral-800">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-3"
          >
            <span className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wider">
              {row.label}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Tooltips ── */
const WpmTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-5 rounded-md bg-white dark:bg-darkSecondary text-black dark:text-gray-200 text-sm max-w-[250px] w-fit shadow-lg">
        <p>
          <span className="font-medium">Mode :</span> {payload[0].payload.mode}
        </p>
        <p>
          <span className="font-medium">WPM :</span> {payload[0].value}
        </p>
        <p>
          <span className="font-medium">Raw :</span> {payload[0].payload.raw}
        </p>
      </div>
    );
  }
  return null;
};

const AccuracyTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-5 rounded-md bg-white dark:bg-darkSecondary text-black dark:text-gray-200 text-sm max-w-[250px] w-fit shadow-lg">
        <p>
          <span className="font-medium">Mode :</span> {payload[0].payload.mode}
        </p>
        <p>
          <span className="font-medium">Accuracy :</span>{" "}
          {payload[0].payload.acc}%
        </p>
        <p>
          <span className="font-medium">Consistency :</span>{" "}
          {payload[0].payload.consistency}%
        </p>
      </div>
    );
  }
  return null;
};

const TrendTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-5 rounded-md bg-white dark:bg-darkSecondary text-black dark:text-gray-200 text-sm max-w-[250px] w-fit shadow-lg">
        <p>
          <span className="font-medium">Test :</span> #
          {payload[0].payload.index}
        </p>
        <p>
          <span className="font-medium">WPM :</span> {payload[0].payload.wpm}
        </p>
        <p>
          <span className="font-medium">Raw :</span> {payload[0].payload.raw}
        </p>
        <p>
          <span className="font-medium">Acc :</span> {payload[0].payload.acc}%
        </p>
        <p>
          <span className="font-medium">Mode :</span> {payload[0].payload.mode}
        </p>
      </div>
    );
  }
  return null;
};

/* ── Loading charts ── */
function LoadingBarChart({
  data,
}: {
  data: { mode: string; value: number }[];
}) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="pointer-events-none relative">
      <div className="grid place-items-center font-semibold text-base sm:text-lg absolute inset-0 z-1">
        Loading Data...
      </div>
      <BarChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        style={{ opacity: "0.25" }}
      >
        <CartesianGrid
          strokeDasharray="2 3"
          stroke={isDarkMode ? "#ffffff20" : "#00000020"}
        />
        <XAxis dataKey="mode" />
        <YAxis />
        <Bar dataKey="value" fill={isDarkMode ? "#404040" : "#ababab"} />
      </BarChart>
    </div>
  );
}

function LoadingAreaChart() {
  const { isDarkMode } = useDarkMode();
  const placeholderData = Array.from({ length: 10 }, (_, i) => ({
    index: i + 1,
    wpm: 60 + Math.sin(i) * 20,
  }));
  return (
    <div className="pointer-events-none relative">
      <div className="grid place-items-center font-semibold text-base sm:text-lg absolute inset-0 z-1">
        Loading Data...
      </div>
      <AreaChart
        width={730}
        height={300}
        data={placeholderData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        style={{ opacity: "0.25" }}
      >
        <CartesianGrid
          strokeDasharray="2 3"
          stroke={isDarkMode ? "#ffffff20" : "#00000020"}
        />
        <XAxis dataKey="index" />
        <YAxis />
        <Area
          type="monotone"
          dataKey="wpm"
          stroke={isDarkMode ? "#d4d4d4" : "#404040"}
          fill={isDarkMode ? "#404040" : "#d4d4d4"}
        />
      </AreaChart>
    </div>
  );
}

/* ── Main Component ── */
export default function MonkeyTypeStats() {
  const { isDarkMode } = useDarkMode();
  const { data } = useSWR<MonkeyTypeData>("/api/stats/monkeytype", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 86400000,
  });

  const pb = data?.personalBests;
  const stats = data?.stats;
  const trendResults = data?.trendResults;

  const allPbs = [pb?.time15, pb?.time30, pb?.time60].filter(
    Boolean,
  ) as PersonalBest[];
  const bestWpm = allPbs.length
    ? Math.round(Math.max(...allPbs.map((p) => p.wpm)))
    : null;
  const bestAcc = allPbs.length
    ? Math.round(Math.max(...allPbs.map((p) => p.acc)) * 100) / 100
    : null;
  const completionRate =
    stats && stats.startedTests > 0
      ? Math.round((stats.completedTests / stats.startedTests) * 100)
      : null;

  const overviewStats: { title: string; value: string | null }[] = [
    { title: "Best WPM", value: bestWpm != null ? `${bestWpm}` : null },
    { title: "Best Accuracy", value: bestAcc != null ? `${bestAcc}%` : null },
    {
      title: "Tests Completed",
      value: stats?.completedTests?.toLocaleString() ?? null,
    },
    {
      title: "Completion Rate",
      value: completionRate != null ? `${completionRate}%` : null,
    },
    {
      title: "Time Typing",
      value: stats ? formatTime(stats.timeTyping) : null,
    },
  ];

  // Chart data
  const wpmChartData = pb
    ? [
        {
          mode: "15 seconds",
          wpm: Math.round(pb.time15?.wpm ?? 0),
          raw: Math.round(pb.time15?.raw ?? 0),
        },
        {
          mode: "30 seconds",
          wpm: Math.round(pb.time30?.wpm ?? 0),
          raw: Math.round(pb.time30?.raw ?? 0),
        },
        {
          mode: "60 seconds",
          wpm: Math.round(pb.time60?.wpm ?? 0),
          raw: Math.round(pb.time60?.raw ?? 0),
        },
      ]
    : null;

  const accChartData = pb
    ? [
        {
          mode: "15 seconds",
          acc: Math.round((pb.time15?.acc ?? 0) * 100) / 100,
          consistency: Math.round((pb.time15?.consistency ?? 0) * 100) / 100,
        },
        {
          mode: "30 seconds",
          acc: Math.round((pb.time30?.acc ?? 0) * 100) / 100,
          consistency: Math.round((pb.time30?.consistency ?? 0) * 100) / 100,
        },
        {
          mode: "60 seconds",
          acc: Math.round((pb.time60?.acc ?? 0) * 100) / 100,
          consistency: Math.round((pb.time60?.consistency ?? 0) * 100) / 100,
        },
      ]
    : null;

  const loadingData = [
    { mode: "15 seconds", value: 80 },
    { mode: "30 seconds", value: 100 },
    { mode: "60 seconds", value: 120 },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════ */}
      {/* Section 1 — Overview Stats Grid               */}
      {/* ══════════════════════════════════════════════ */}
      <div className="mb-20">
        <SectionHeading
          eyebrow="Monkeytype"
          title="Typing Performance"
          description="Personal typing statistics and records from Monkeytype, refreshed daily."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-px bg-gray-200 dark:bg-darkSecondary border border-gray-200 dark:border-darkSecondary"
        >
          {overviewStats.map((stat, index) => (
            <MonkeyStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* Section 2 — Personal Bests Detail Cards       */}
      {/* ══════════════════════════════════════════════ */}
      <div className="mb-20">
        <SectionHeading
          eyebrow="Personal Bests"
          title="Records by Mode"
          description="Detailed breakdown of my best typing test results across 15, 30, and 60 second timed modes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PersonalBestCard mode="15 Seconds" pb={pb?.time15} />
          <PersonalBestCard mode="30 Seconds" pb={pb?.time30} />
          <PersonalBestCard mode="60 Seconds" pb={pb?.time60} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* Section 3 — WPM Trend (full-width area chart) */}
      {/* ══════════════════════════════════════════════ */}
      <div className="mb-20">
        <ChartSectionHeading
          title="WPM Trend"
          description="Words per minute across my last 30 tests, in chronological order."
        />
        <ResponsiveContainer width="100%" height={300}>
          {trendResults && trendResults.length > 0 ? (
            <AreaChart
              data={trendResults}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e2b714" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#e2b714" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="2 3"
                stroke={isDarkMode ? "#ffffff20" : "#00000020"}
              />
              <XAxis
                dataKey="index"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: isDarkMode ? "#737373" : "#6b7280",
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: isDarkMode ? "#737373" : "#6b7280",
                }}
              />
              <Tooltip
                content={<TrendTooltip />}
                cursor={{
                  stroke: isDarkMode ? "#ffffff30" : "#00000020",
                  strokeWidth: 1,
                }}
              />
              <Area
                type="monotone"
                dataKey="wpm"
                stroke="#e2b714"
                strokeWidth={2}
                fill="url(#wpmGradient)"
                dot={{
                  r: 3,
                  fill: "#e2b714",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "#f59e0b",
                  strokeWidth: 0,
                }}
              />
            </AreaChart>
          ) : (
            <LoadingAreaChart />
          )}
        </ResponsiveContainer>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* Section 4 — PB Charts (2-col grid)            */}
      {/* ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-full">
          <ChartSectionHeading
            title="Speed by Mode"
            description="Best words per minute across timed modes."
          />
          <ResponsiveContainer width="100%" height={300}>
            {wpmChartData ? (
              <BarChart
                width={730}
                height={250}
                data={wpmChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="2 3"
                  stroke={isDarkMode ? "#ffffff20" : "#00000020"}
                />
                <XAxis dataKey="mode" />
                <YAxis />
                <Tooltip
                  content={<WpmTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="wpm" fill="#e2b714" radius={[3, 3, 0, 0]} />
              </BarChart>
            ) : (
              <LoadingBarChart data={loadingData} />
            )}
          </ResponsiveContainer>
        </div>

        <div className="max-w-full">
          <ChartSectionHeading
            title="Accuracy & Consistency"
            description="Accuracy and consistency across timed modes."
          />
          <ResponsiveContainer width="100%" height={300}>
            {accChartData ? (
              <BarChart
                width={730}
                height={250}
                data={accChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="2 3"
                  stroke={isDarkMode ? "#ffffff20" : "#00000020"}
                />
                <XAxis dataKey="mode" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={<AccuracyTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="acc"
                  fill="#22c55e"
                  name="Accuracy"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="consistency"
                  fill="#3b82f6"
                  name="Consistency"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            ) : (
              <LoadingBarChart data={loadingData} />
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
