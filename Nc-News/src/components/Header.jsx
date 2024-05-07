import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <h1>NC NEWS</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </nav>
    </header>
  );
}

//   <Link to="/posts">Posts</Link>
//   <Link to="/topics">Topics</Link>
