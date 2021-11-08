import styles from "../styles/Tags.module.css";
import { useRouter } from "next/router";

export default function Tags({
  blogTags,
  handleTagSelection,
  query,
}) {
  const router = useRouter();
  async function handleTagSelection(e) {
    e.preventDefault();
    console.log(e.target.checked, e.target.value);
    router.push(`/blogs/?tag=${e.target.value}`);
  }
  return (
    <div className="relative mt-3">
      <div className={styles.container} onChange={handleTagSelection}>
        {/* <Tag checked={true} /> */}

        {blogTags.map((tag) => {
          return <Tag key={tag} tag={tag} checked={tag === query} />;
        })}
      </div>
      {/* Gradient touch to the left and right */}
      <div className="absolute top-0 right-0 bottom-0 bg-gradient-to-l from-white h-10 w-1/12" />
      <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-white h-10 w-1/12" />
    </div>
  );
}

export function Tag({ tag, checked = false }) {
  return (
    <div className={styles.tag}>
      <input
        className=""
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
