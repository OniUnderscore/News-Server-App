import axios from "axios";

const api = axios.create({
  baseURL: "https://news-server-api.onrender.com/api",
});

export function getArticles(params) {
  console.log(params);
  return api.get("/articles", params);
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

export function postComment(article_id, comment) {
  return api.post(`/articles/${article_id}/comments`, comment);
}

export function deleteComment(comment_id) {
  return api.delete(`/comments/${comment_id}`);
}

export function getTopics() {
  return api.get("/topics");
}
