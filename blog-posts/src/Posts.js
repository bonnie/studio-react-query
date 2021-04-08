import { useState, useEffect } from "react";

import { PostDetail } from "./PostDetail";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // get posts on component mount
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";
  }, []);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
