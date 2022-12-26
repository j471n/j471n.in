import { NextApiRequest, NextApiResponse } from "next";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA_PROPERTY_ID;
const DAYS = 7;

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\n/gm, '\n'),
  },
});

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: `${DAYS}daysAgo`,
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "year",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  let totalVisitors = 0;
  response.rows?.forEach((row: any) => {
    totalVisitors += parseInt(row.metricValues[0].value);
  });

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=21600"
  );

  return res.status(200).json({
    totalVisitors,
    days: 7,
  });
}
