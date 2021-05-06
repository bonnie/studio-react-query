import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  // still getting initial data
  if (isFetching && !isFetchingNextPage)
    return <div className="loading">Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <>
      {isFetchingNextPage && (
        <div className="loading">Loading more data...</div>
      )}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((page) =>
          page.results.map((item) => (
            <Person
              key={item.id}
              name={item.name}
              hairColor={item.hair_color}
              eyeColor={item.eye_color}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
