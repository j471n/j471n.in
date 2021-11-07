// import { comment } from "postcss";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { compareDocumentPosition } from "domutils";
// import { useDeprecatedInvertedScale } from "framer-motion";
import Comment from "./Comment";

export default function Comments({ articleId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://dev.to/api/comments?a_id=${articleId}?sort=-created_at`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [articleId]);

  return (
    <div className="pb-24 pt-3">
      <h1 className="font-bold text-xl">
        Comments <span className="text-lg">({comments.length})</span>
      </h1>
      <div className="max-w-xl flex flex-col mx-auto">
        {comments.map((comment) => {
          return (
            <>
              <Comment key={comment.id_code} comment={comment} margin={0}/>
            </>
          );
        })}
      </div>
    </div>
  );
}
