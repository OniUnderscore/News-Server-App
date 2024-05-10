import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./Containers/ArticleCard";
import { useNavigate, useParams } from "react-router-dom";
import { SortForm } from "./SortForm";

export function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("created_at");
  const [dir, setDir] = useState("asc");
  const { slug } = useParams();
  const params = { params: { topic: slug, sort_by: sort, order: dir } };

  useEffect(() => {
    setIsLoading(true);
    getArticles(params).then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, [slug, sort, dir]);

  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  const handleDir = (e) => {
    e.preventDefault();
    setDir(e.target.value);
  };

  if (isLoading) {
    return (
      <section>
        <h2>Loading...</h2>
        <SortForm handleSort={handleSort} handleDir={handleDir} />
      </section>
    );
  } else {
    return (
      <section>
        {slug ? <h2>Articles on {slug}</h2> : <h2>Articles</h2>}
        <SortForm handleSort={handleSort} handleDir={handleDir} />
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </section>
    );
  }
}
