import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./Containers/ArticleCard";

export function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <section>
      <h2>Articles</h2>
      {isLoading && <h2>Loading...</h2>}
      <ul>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
}
