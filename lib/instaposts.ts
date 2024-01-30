import { getUserDataValue, setUserDataValue } from "./supabase";

import { InstagramData } from "./interface";
import { generateUrl } from "@utils/functions";

export async function generateNewAccessTokenInstagram(
  token: string
): Promise<string | undefined> {
  const requestURL = generateUrl(
    "https://graph.instagram.com/refresh_access_token",
    {
      grant_type: "ig_refresh_token",
      access_token: token,
    }
  );

  try {
    const response = await fetch(requestURL);

    if (response.ok) {
      const result = await response.json();
      const newToken = result?.access_token;
      if (newToken) {
        await setUserDataValue("instagram_user_token", newToken);
        return newToken;
      }
    } else {
      return token;
    }
  } catch (e) {
    console.error("Error : ", e);
    return token;
  }
}

export async function getInstagramPosts(
  additionalParams = {}
): Promise<InstagramData[]> {
  const { data: token } = await getUserDataValue("instagram_user_token");

  let outputData: InstagramData[] = [];

  let requestParameters: any = {
    fields: "id,permalink,caption,media_url,thumbnail_url,media_type,timestamp",
    limit: 9,
    access_token: token,
    ...additionalParams,
  };

  const requestURL = generateUrl(
    "https://graph.instagram.com/me/media",
    requestParameters
  );

  try {
    const response = await fetch(requestURL);

    if (response.ok) {
      const result = (await response.json()) as InstagramData[];
      outputData = result;
    }
  } catch (e) {
    console.error("error", e);

    const newToken = await generateNewAccessTokenInstagram(token);
    requestParameters.access_token = newToken;
    const requestURL = generateUrl(
      "https://graph.instagram.com/me/media",
      requestParameters
    );
    const response = await fetch(requestURL);

    if (response.ok) {
      const result = (await response.json()) as InstagramData[];
      outputData = result;
    }
  }
  return outputData;
}
