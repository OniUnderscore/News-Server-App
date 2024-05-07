export function ArticleCard({ article }) {
  const created = new Date(article.created_at);
  return (
    <li className="articleCard">
      <h1>{article.title}</h1>
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
