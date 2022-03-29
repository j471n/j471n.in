import Interweave from "interweave";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import styles from "../styles/Comment.module.css";

export default function Comment({ comment, margin, articleAuthor }) {
  return (
    <div
      className="flex flex-col com max-w-full border-l-2 border-purple-300 dark:border-purple-500 space-y-3 rounded-tl-lg rounded-bl-lg "
      style={{ marginLeft: `${margin}px` }}
    >
      <div
        className={` flex items-start flex-col space-y-1 ring-1 ring-gray-500 dark:bg-darkSecondary p-2 rounded-lg max-w-full`}
      >
        <div
          className="flex items-center space-x-2 text-xs font-medium cursor-pointer md:text-base"
          onClick={() =>
            window.open(
              "https://dev.to/" +
                comment.user?.username +
                "/comment/" +
                comment.id_code
            )
          }
        >
          <Image
            className="rounded-full w-full"
            src={comment.user?.profile_image}
            width={30}
            height={30}
          />
          <p className="text-xs">{comment.user?.name || "Anonymous"}</p>
          {comment.user?.username === articleAuthor.username && (
            <GoVerified className="text-gray-500 -m-2 " />
          )}

          {/* Single Dot */}
          <span>&#183;</span>

          {/* Date of Comment */}
          <p className="text-xs">
            {new Date(comment.created_at).toDateString().slice(4)}
          </p>
        </div>
        <div className={styles.comment}>
          <Interweave content={comment.body_html} />
        </div>
      </div>
      {comment.children &&
        comment.children.map((child) => {
          return (
            <Comment
              key={child.id_code}
              comment={child}
              margin={10}
              articleAuthor={articleAuthor}
            />
          );
        })}
    </div>
  );
}
