import { useEffect, useState } from "react";
import Image from "next/image";

import Comment from "./Comment";

export default function Comments({ articleId, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);

  const url =
    articleId &&
    `https://dev.to/api/comments?a_id=${articleId}?sort=-created_at`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));

    const com = document.querySelectorAll(".com");
    setCount(com.length);
  }, [articleId]);

  return (
    <div className="pb-24 p-2 pt-3 max-w-xl mx-auto ">
      <h1 className="font-bold text-xl">
        Comments <span className="text-lg">({count})</span>
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
