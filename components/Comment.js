import Interweave from "interweave";
import Image from "next/image";

export default function Comment({ comment, margin}) {
  console.log(margin);
  return (
    <div className="flex flex-col ">
      <div
        className={`ml-${margin} ${
          margin && "border-l-4"
        } flex items-start flex-col my-2 space-y-1 border-2 p-2 rounded-lg `}
      >
        <div
          className="flex items-center space-x-2 text-xs font-medium cursor-pointer"
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
            className="rounded-full w-full h"
            src={comment.user.profile_image}
            width={30}
            height={30}
          />
          <p>{comment.user.name}</p>
        </div>
        <Interweave className="comment" content={comment.body_html} />
      </div>
      {comment.children && comment.children.map((child) => {
        return <Comment key={child.id_code} comment={child} margin={margin+10} />;
      })}
    </div>
  );
}
