import styles from "../styles/Tags.module.css";
import { useEffect } from "react";
export default function Tags({
  blogs,
  blogTags,
  activeTag,
  setActiveTag,
  setFilteredBlogs,
}) {

  useEffect(() => {
    if (activeTag === "all") {
      setFilteredBlogs(blogs);
    } else if (activeTag === "popular") {
      const popularBlogs = [...blogs].sort(
        (a, b) => b.page_views_count - a.page_views_count
      );
      setFilteredBlogs(popularBlogs);
    } else {
      const filter = blogs.filter((blog) => blog.tag_list?.includes(activeTag));
      setFilteredBlogs(filter);
    }
  }, [activeTag]);

  return (
    <div className="relative dark:bg-darkPrimary">
      <div
        className={styles.container}
        onChange={(e) => setActiveTag(e.target.value)}
      >
        {blogTags.map((tag) => {
          return <Tag key={tag} tag={tag} checked={tag === activeTag} />;
        })}
      </div>
      {/* Gradient touch to the left and right */}
      <div className="absolute top-0 right-0 bottom-0 bg-gradient-to-l flex from-white dark:from-darkPrimary w-4" />
      <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r flex from-white dark:from-darkPrimary w-4" />
    </div>
  );
}

export function Tag({ tag, checked }) {
  return (
    <div className={`${styles.tag} scrollbar-hide`}>
      <input
        type="radio"
        name="tag"
        id={tag ? tag : "all"}
        value={tag ? tag : "all"}
        checked={checked}
      />
      <label
        className={` dark:text-gray-300 dark:hover:bg-darkSecondary font-medium ${
          checked && "dark:!bg-white dark:!text-black"
        }`}
        htmlFor={tag ? tag : "all"}
      >
        {tag ? tag : "all"}
      </label>
    </div>
  );
}
