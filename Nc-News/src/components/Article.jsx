import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, getComments, patchArticle } from "../api";
import { CommentCard } from "./Containers/CommentCard";
import UpEgg from "./images/UpEgg.svg?react";
import DownEgg from "./images/DownEgg.svg?react";
import GreyDownEgg from "./images/GreyDownEgg.svg?react";
import GreyUpEgg from "./images/GreyUpEgg.svg?react";
import { CommentForm } from "./commentForm";
import Lottie from "lottie-react";
import Animation from "./images/Animation - 1715350378279.json";

export function Article({ user }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const created = new Date(article.created_at);
  const [isLoading, setIsLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState([]);
  const [vote, setVote] = useState(0);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(false);

  const resetVote = () => {
    if (vote >= 1) {
      setVotes((currentVotes) => {
        return votes - 1;
      });
      patchArticle(article.article_id, -1);
    } else if (vote <= -1) {
      setVotes((currentVotes) => {
        return votes + 1;
      });
      patchArticle(article.article_id, 1);
    }
    setVote(0);
  };

  const upVote = () => {
    if (vote <= -1) {
      setVote(2);
    } else if (vote === 0) {
      setVote(1);
    }
  };
  const DownVote = () => {
    if (vote >= 1) {
      setVote(-2);
    } else if (vote === 0) {
      setVote(-1);
    }
  };

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    Promise.all([getArticle(article_id), getComments(article_id)])
      .then(([article, comments]) => {
        setArticle(article.data.article);
        setComments(comments.data.comments);
        setVotes(article.data.article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, [article_id]);

  useEffect(() => {
    getComments(article_id).then((response) => {
      setComments(response.data.comments);
    });
  }, [comments]);

  useEffect(() => {
    setVotes((currentVotes) => {
      return votes + vote;
    });
  }, [vote]);

  useEffect(() => {
    patchArticle(article_id, vote);
  }, [votes]);

  if (error) {
    return (
      <section>
        <h2>404: Article Not Found</h2>
        <Lottie animationData={Animation} loop={true} />
      </section>
    );
  } else if (isLoading) {
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

          <div className="voteContainer">
            <div className="EggButton">
              {vote >= 1 ? (
                <UpEgg onClick={() => resetVote()} />
              ) : (
                <GreyUpEgg onClick={() => upVote()} />
              )}
            </div>
            <p className="upvotes">{votes}</p>
            <div className="EggButton">
              {vote <= -1 ? (
                <DownEgg onClick={() => resetVote()} />
              ) : (
                <GreyDownEgg onClick={() => DownVote(-1)} />
              )}
            </div>
          </div>
          <Link
            className="comments"
            to={"/articles/" + article_id + "/comments"}
          >
            {article.comment_count} Comments
          </Link>
        </article>
        <hr className="commentPreviews" />
        <section className="commentPreviews">
          <button
            onClick={() => {
              setCommenting(true);
            }}
          >
            New Comment
          </button>
          {commenting && (
            <CommentForm
              user={user}
              article_id={article_id}
              setCommenting={setCommenting}
            />
          )}
          {comments[0] && (
            <CommentCard
              comment={comments[0]}
              comments={comments}
              user={user}
            />
          )}
          {comments[1] && (
            <CommentCard
              comment={comments[1]}
              comments={comments}
              s
              user={user}
            />
          )}
          {comments[2] && (
            <CommentCard
              comment={comments[2]}
              comments={comments}
              user={user}
            />
          )}
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
