import { Link } from "react-router-dom";

export function TopicCard({ topic }) {
  return (
    <div className="topicCard">
      <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
      <p>{topic.description}</p>
    </div>
  );
}
