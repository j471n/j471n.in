// Converts string to Slug
export function stringToSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
