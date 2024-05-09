import { useEffect, useState } from "react";
import { getArticle, getComments } from "../api";
import { CommentCard } from "./Containers/CommentCard";
import { useParams } from "react-router-dom";

export function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articleTitle, setArticleTitle] = useState("");

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
        <ul>
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </section>
    );
  }
}
