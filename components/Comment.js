import Interweave from "interweave";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import styles from "../styles/Comment.module.css";
export default function Comment({ comment, margin, articleAuthor }) {
  return (
    <div className="flex flex-col com w-full ">
      <div
        className={`ml-${margin} ${
          margin && "border-l-4"
        } flex items-start flex-col my-2 space-y-1 border-2 p-2 rounded-lg `}
      >
        <div
          className="flex items-center space-x-2 text-xs font-medium cursor-pointer md:text-base"
          onClick={() =>
            window.open(
              "https://dev.to/" +
                comment.user.username +
                "/comment/" +
                comment.id_code
            )
          }
        >
          <Image
            className="rounded-full w-full"
            src={comment.user.profile_image}
            width={30}
            height={30}
          />
          <p>{comment.user.name}</p>
          {comment.user.username === articleAuthor.username && (
            <GoVerified className="text-gray-500 -m-2 " />
          )}
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
              margin={margin + 10}
              articleAuthor={articleAuthor}
            />
          );
        })}
    </div>
  );
}
