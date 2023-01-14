import { createClient } from "@supabase/supabase-js";

// A Supabase client object for making requests to a Supabase server.
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

/**
 * Asynchronously fetches all projects from the database where the 'pinned' column is set to true.
 * The results are sorted by the 'created_at' column in descending order.
 */
export async function getProjects() {
  let { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("pinned", "true")
    .order("created_at", { ascending: false });

  return {
    projects,
    error: error !== null,
  };
}

/**
 * Asynchronously fetches all certificates from the database where the 'pinned' column is set to true.
 * The results are sorted by the 'created_at' column in descending order.
 */
export async function getCertificates() {
  let { data: certificates, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("pinned", "true")
    .order("created_at", { ascending: false });

  return {
    certificates,
    error: error !== null,
  };
}

export async function addView(slug: string) {
  try {
    const blogSlug = await getViewBySlug(slug);

    if (blogSlug !== undefined) {
      return await supabase
        .from("views")
        .update({ views: blogSlug.views + 1 })
        .eq("slug", slug);
    } else {
      return await supabase.from("views").insert({
        slug: slug,
        views: 1,
      });
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getViewBySlug(slug: string) {
  try {
    const { data } = await supabase
      .from("views")
      .select("views")
      .eq("slug", slug);
    return data![0];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllViews() {
  try {
    // views_sum is defined in supabase
    const { data: totalViews } = await supabase.rpc("views_sum");
    const { data: posts } = await supabase.from("views").select("*");

    return {
      totalViews,
      posts,
    };
  } catch (error) {
    console.error(error);
  }
}
