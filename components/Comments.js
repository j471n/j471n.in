import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function Comments({ articleId, articleAuthor }) {
  const [comments, setComments] = useState([]);

  const url =
    articleId &&
    `https://dev.to/api/comments?a_id=${articleId}?sort=-created_at`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [articleId]);

  return (
    <div className="pb-24 p-2 pt-3 max-w-3xl mx-2 sm:mx-auto ">
      <h1 className="font-bold text-xl">
        Comments <span className="text-lg">({comments.length})</span>
      </h1>
      {articleId && comments && (
        <div className="flex flex-col">
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
          {/* {comments.map((comment) => {
            return (
              <>
                <Comment
                  key={comment.id_code}
                  comment={comment}
                  margin={0}
                  articleAuthor={articleAuthor}
                />
              </>
            );
          })} */}
        </div>
      )}
    </div>
  );
}
