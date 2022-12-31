import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

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
