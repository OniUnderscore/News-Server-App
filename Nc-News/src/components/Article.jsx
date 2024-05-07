import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";

export function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const created = new Date(article.created_at);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id).then((response) => {
      setArticle(response.data.article);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <article>
        <h1>Loading...</h1>
      </article>
    );
  } else {
    return (
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
        <p className="comments">{article.comment_count + " Comments"}</p>
      </article>
    );
  }
}
