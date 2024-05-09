import axios from "axios";

const api = axios.create({
  baseURL: "https://news-server-api.onrender.com/api",
});

export function getArticles() {
  return api.get("/articles");
}

export function getArticle(article_id) {
  return api.get(`/articles/${article_id}`);
}

export function getComments(article_id) {
  return api.get(`/articles/${article_id}/comments`);
}

export function patchComment(comment_id, inc_votes) {
  return api.patch(`/comments/${comment_id}`, { inc_votes });
}

export function patchArticle(article_id, inc_votes) {
  return api.patch(`/articles/${article_id}`, { inc_votes });
}
