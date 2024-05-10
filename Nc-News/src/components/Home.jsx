import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./Containers/ArticleCard";

export function Home({ user }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = {
    params: { author: user, sort_by: "created_at", order: "desc" },
  };
  useEffect(() => {
    setIsLoading(true);
    getArticles(params).then((response) => {
      setArticles(response.data.articles);
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
      <section className="HomeBox">
        <h2>Welcome back {user}!</h2>
        <h3>Your recent posts:</h3>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </section>
    );
  }
}
