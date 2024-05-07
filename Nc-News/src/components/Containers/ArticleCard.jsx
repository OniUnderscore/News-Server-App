import { Link } from "react-router-dom";

export function ArticleCard({ article }) {
  const created = new Date(article.created_at);
  return (
    <li key={article.article_id} className="articleCard">
      <Link className="ArticleLink" to={"/articles/" + article.article_id}>
        {article.title}
      </Link>
      <div>
        <h2>Author:</h2>
        <p>{article.author}</p>
        <h2>Posted On:</h2>
        <p>{created.toLocaleString("en-GB").split(",")[0]}</p>
        <h2>Votes:</h2>
        <p>{article.votes}</p>
        <h2>Comments:</h2>
        <p>{article.comment_count}</p>
      </div>
      <img src={article.article_img_url} alt={article.title + " cover image"} />
    </li>
  );
}
