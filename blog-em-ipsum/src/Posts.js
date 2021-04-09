import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const {
    data,
    isFetching,
    error,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery("posts", () => fetchPosts(currentPage), {
    staleTime: 5000,
    keepPreviousData: true,
  });

  if (isFetching) {
    return <h3>Loading!</h3>;
  }

  if (error) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <ul>
        {data.pages[currentPage].map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage < 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            fetchPreviousPage({ pageParam: currentPage });
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage > maxPostPage - 2}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            fetchNextPage({ pageParam: currentPage });
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
