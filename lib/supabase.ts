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
