import Comment from "./Comment";

export default function Comments({ articleId, comments, articleAuthor }) {
  return (
    <div className="pb-16 pt-3 max-w-3xl sm:mx-auto ">
      <h1 className="font-bold text-xl my-2">
        Comments <span className="text-lg">({comments.length})</span>
      </h1>
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
