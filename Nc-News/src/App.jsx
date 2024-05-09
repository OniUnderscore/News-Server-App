import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Articles } from "./components/Articles";
import { Article } from "./components/Article";
import { Comments } from "./components/Comments";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("happyamy2016");
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles user={user} />} />
        <Route path="/articles/:article_id" element={<Article user={user} />} />
        <Route
          path="/articles/:article_id/comments"
          element={<Comments user={user} />}
        />
      </Routes>
    </>
  );
}

export default App;
