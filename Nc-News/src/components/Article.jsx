import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, getComments } from "../api";
import { CommentCard } from "./Containers/CommentCard";

export function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const created = new Date(article.created_at);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getArticle(article_id), getComments(article_id)]).then(
      ([article, comments]) => {
        setArticle(article.data.article);
        setComments(comments.data.comments);
        setIsLoading(false);
      }
    );
  }, []);
  if (isLoading) {
    return (
      <article>
        <h1>Loading...</h1>
      </article>
    );
  } else {
    return (
      <>
        <article>
          <h1>{article.title}</h1>
          <p className="author">{article.author + " in " + article.topic}</p>
          <p className="posted">
            {created.toLocaleString("en-GB").split(",")[0]}
          </p>
          <img
            src={article.article_img_url}
            alt={article.title + " Killer Image"}
          />
          <p className="body">{article.body}</p>
          <p className="upvotes">{article.votes + " Upvotes"}</p>
          <Link
            className="comments"
            to={"/articles/" + article_id + "/comments"}
          >
            {article.comment_count} Comments
          </Link>
        </article>
        <hr className="commentPreviews" />
        <section className="commentPreviews">
          <CommentCard comment={comments[0]} />
          <CommentCard comment={comments[1]} />
          <CommentCard comment={comments[2]} />
          <Link
            className="comments"
            to={"/articles/" + article_id + "/comments"}
          >
            Read More
          </Link>
        </section>
      </>
    );
  }
}
