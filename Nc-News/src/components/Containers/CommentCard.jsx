import UpEgg from "../images/Egg_UpEgg.svg?react";
import DownEgg from "../images/Egg_DownEgg.svg?react";

export function CommentCard({ comment }) {
  const created = new Date(comment.created_at);
  return (
    <li className="commentCard">
      <p className="commentOrigin">
        {comment.author} at {created.toLocaleString("en-GB")}
      </p>
      <p className="commentBody">{comment.body}</p>
      <div className="commentVotes">
        <div className="EggButton">
          <UpEgg />
        </div>
        <p>{comment.votes}</p>
        <div className="EggButton">
          <DownEgg />
        </div>
      </div>
    </li>
  );
}
