import axios from "axios";

const api = axios.create({
  baseURL: "https://news-server-api.onrender.com/api",
});

export function getArticles() {
  return api.get("/articles");
}
