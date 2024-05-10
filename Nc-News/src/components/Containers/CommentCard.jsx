import UpEgg from "../images/UpEgg.svg?react";
import DownEgg from "../images/DownEgg.svg?react";
import GreyDownEgg from "../images/GreyDownEgg.svg?react";
import GreyUpEgg from "../images/GreyUpEgg.svg?react";
import { useState } from "react";
import { useEffect } from "react";
import { deleteComment, patchComment } from "../../api";

export function CommentCard({ comment, comments, user }) {
  const [vote, setVote] = useState(0);
  const [votes, setVotes] = useState(comment.votes);
  const [deleting, setDeleting] = useState(0);

  useEffect(() => {
    setVotes((currentVotes) => {
      return votes + vote;
    });
  }, [vote]);

  useEffect(() => {
    setVotes(comment.votes);
  }, [comments]);

  useEffect(() => {
    patchComment(comment.comment_id, vote);
  }, [votes]);

  const resetVote = () => {
    if (vote >= 1) {
      setVotes((currentVotes) => {
        return votes - 1;
      });
      patchComment(comment.comment_id, -1);
    } else if (vote <= -1) {
      setVotes((currentVotes) => {
        return votes + 1;
      });
      patchComment(comment.comment_id, 1);
    }
    setVote(0);
  };

  const upVote = () => {
    if (vote <= -1) {
      setVote(2);
    } else if (vote === 0) {
      setVote(1);
    }
  };
  const DownVote = () => {
    if (vote >= 1) {
      setVote(-2);
    } else if (vote === 0) {
      setVote(-1);
    }
  };

  const handleDelete = (e) => {
    if (deleting === 0) {
      e.target.innerHTML = "Really?";
      setDeleting(1);
    } else if (deleting === 1) {
      e.target.innerHTML = "Deleting...";
      deleteComment(comment.comment_id).then(() => {
        setDeleting(0);
        e.target.innerHTML = "X";
      });
    }
  };

  const created = new Date(comment.created_at);
  return (
    <li className="commentCard">
      <p className="commentOrigin">
        {comment.author} at {created.toLocaleString("en-GB")}
      </p>
      {user === comment.author && (
        <button
          onClick={(e) => {
            handleDelete(e);
          }}
        >
          X
        </button>
      )}
      <p className="commentBody">{comment.body}</p>
      <div className="commentVotes">
        <div className="EggButton">
          {vote >= 1 ? (
            <UpEgg onClick={() => resetVote()} />
          ) : (
            <GreyUpEgg onClick={() => upVote()} />
          )}
        </div>
        <p>{votes}</p>
        <div className="EggButton">
          {vote <= -1 ? (
            <DownEgg onClick={() => resetVote()} />
          ) : (
            <GreyDownEgg onClick={() => DownVote(-1)} />
          )}
        </div>
      </div>
    </li>
  );
}
