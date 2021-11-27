import styles from "../styles/Tags.module.css";
import { useRouter } from "next/router";

export default function Tags({ blogTags, handleTagSelection, query }) {
  const router = useRouter();
  async function handleTagSelection(e) {
    // Preventing the router to refresh
    router.push(`/blogs/?tag=${e.target.value}`, null, { shallow: true });
  }
  return (
    <div className="relative mt-3">
      <div className={styles.container} onChange={handleTagSelection}>
        {blogTags.map((tag) => {
          return <Tag key={tag} tag={tag} checked={tag === query} />;
        })}
      </div>
      {/* Gradient touch to the left and right */}
      <div className="absolute top-0 right-0 bottom-0 bg-gradient-to-l flex from-white w-1/12" />
      <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r flex from-white w-1/12" />
    </div>
  );
}

export function Tag({ tag, checked = false }) {
  return (
    <div className={`${styles.tag} scrollbar-hide`}>
      <input
        type="radio"
        name="tag"
        id={tag ? tag : "all"}
        value={tag ? tag : "all"}
        checked={checked}
      />
      <label className="" htmlFor={tag ? tag : "all"}>
        {tag ? tag : "all"}
      </label>
    </div>
  );
}