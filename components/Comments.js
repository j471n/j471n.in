import Comment from "./Comment";
import { AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";

export default function Comments({
  likes,
  articleId,
  comments,
  comments_count,
  articleAuthor,
}) {
  return (
    <div className="pb-16 pt-3 w-full max-w-3xl sm:mx-auto print:hidden">

      <div className="flex items-center mb-3 rounded-md shadow overflow-hidden">
        <DataCard name="like" Icon={AiOutlineLike} count={likes} />
        <DataCard
          name="Comment"
          Icon={GoCommentDiscussion}
          count={comments_count}
        />
      </div>

      <p className="text-sm text-center">
        {!comments.length && "No Comments yet"}
      </p>
      {articleId && comments && (
        <div className="flex flex-col space-y-3">
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id_code}
                comment={comment}
                margin={0}
                articleAuthor={articleAuthor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function DataCard({ count, Icon, name }) {
  return (
    <div className="flex flex-col items-center w-1/2  bg-zinc-100  dark:bg-darkSecondary dark:text-white py-4 first:border-r-2 dark:border-white">
      <h1 className="text-4xl font-bold">{count}</h1>
      <div className="flex items-center space-x-2 text-md mt-2">
        <Icon className="text-xl" />
        <p className="capitalize">{name}</p>
      </div>
    </div>
  );
}
