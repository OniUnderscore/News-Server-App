import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./Containers/ArticleCard";
import { useNavigate, useParams } from "react-router-dom";

export function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const params = { params: { topic: slug } };

  useEffect(() => {
    setIsLoading(true);
    getArticles({ params: { topic: slug } }).then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <section>
        {slug ? <h2>Articles on {slug}</h2> : <h2>Articles</h2>}
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </section>
    );
  }
}
