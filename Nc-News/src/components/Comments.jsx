import { useEffect, useState } from "react";
import { getArticle, getComments } from "../api";
import { CommentCard } from "./Containers/CommentCard";
import { useParams } from "react-router-dom";
import { CommentForm } from "./commentForm";

export function Comments({ user }) {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articleTitle, setArticleTitle] = useState("");
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getComments(article_id), getArticle(article_id)]).then(
      ([comments, article]) => {
        setComments(comments.data.comments);
        setArticleTitle(article.data.article.title);
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    getComments(article_id).then((response) => {
      setComments(response.data.comments);
    });
  }, [comments]);

  if (isLoading) {
    return (
      <section>
        <h1 className="commentTitle">Loading...</h1>
      </section>
    );
  } else {
    return (
      <section>
        <h1 className="commentTitle">Comments on</h1>

        <h1 className="commentTitle"> {articleTitle}</h1>

        <button
          onClick={() => {
            setCommenting(true);
          }}
        >
          New Comment
        </button>
        {commenting && (
          <CommentForm
            user={user}
            article_id={article_id}
            setCommenting={setCommenting}
          />
        )}
        <ul>
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </section>
    );
  }
}
