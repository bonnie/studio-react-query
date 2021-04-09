async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const data = [];

  if (!data) return null;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
