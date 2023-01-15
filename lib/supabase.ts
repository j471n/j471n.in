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


/**
 * This function is used to add a view to the specified blog post. It first retrieves the blog post from the database 
 * by its slug value. If the post exists, it increments the view count by 1 and updates it in the database.
 * If the post does not exist, it creates a new record with the slug and views set to 1.
 */
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

/**
 * This function is used to retrieve the view count of a specified blog post by its slug value.
 * It queries the database and selects the "views" field for the record with a matching "slug" value.
 */
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

/**
 *
 * This function is used to retrieve all the views count and all the blog post in the database.
 * It first retrieves the total views count using a predefined function "views_sum" in supabase.
 * Then it retrieves all the records from "views" table.
 */
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
