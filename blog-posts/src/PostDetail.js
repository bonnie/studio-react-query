import { useState, useEffect } from "react";

export function Posts({ post }) {
  const [comments, setComments] = useState([]);

  // get post details on component mount
  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`;
  }, [post]);

  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
