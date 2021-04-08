import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  // get posts on app mount
  useEffect(() => {}, []);

  return (
    <div className="App">
      <h1>Blog Posts</h1>
    </div>
  );
}

export default App;
