import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { TopicCard } from "./Containers/TopicCard";

export function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((response) => {
      setTopics(response.data.topics);
      setIsLoading(false);
    });
  }, []);

  return (
    <section>
      <h2>Topics</h2>
      {isLoading && <h2>Loading...</h2>}
      <ul>
        {topics.map((topic) => {
          return <TopicCard key={topic.slug} topic={topic} />;
        })}
      </ul>
    </section>
  );
}
