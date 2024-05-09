import { useState } from "react";
import { postComment } from "../api";

export function CommentForm({ article_id, user, setCommenting }) {
  const [posting, setPosting] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();
    setPosting(true);
    const commentBody = document.getElementById("commentBody").value;
    const comment = {
      body: commentBody,
      username: user,
    };

    postComment(article_id, comment).then(() => {
      setCommenting(false);
      setPosting(false);
    });
  };

  return (
    <form className="commentForm">
      <textarea name="Comment Body" id="commentBody" placeholder="Comment..." />
      <button
        onClick={(e) => {
          handlePost(e);
        }}
      >
        {posting ? "posting" : "Submit!"}
      </button>
    </form>
  );
}
