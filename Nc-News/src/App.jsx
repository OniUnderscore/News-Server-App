import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Articles } from "./components/Articles";
import { Article } from "./components/Article";
import { Comments } from "./components/Comments";
import { useState } from "react";
import { Topics } from "./components/Topics";
import { ErrorPage } from "./components/errorpage";

function App() {
  const [user, setUser] = useState("happyamy2016");
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/articles" element={<Articles user={user} />} />
        <Route path="/articles/:article_id" element={<Article user={user} />} />
        <Route
          path="/articles/:article_id/comments"
          element={<Comments user={user} />}
        />
        <Route path="/topics/:slug" element={<Articles user={user} />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
