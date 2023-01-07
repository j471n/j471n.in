/**
 * Converts a string to a slug by lowercasing it, trimming leading and trailing whitespace,
 * replacing any non-word or non-space characters with an empty string, replacing all contiguous whitespace
 * with a single hyphen, and removing any hyphens from the beginning or end of the resulting string.
 */
export function stringToSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
