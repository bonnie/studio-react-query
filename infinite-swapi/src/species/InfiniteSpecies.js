import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "sw-species",
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
            <Species
              key={item.id}
              name={item.name}
              language={item.language}
              averageLifespan={item.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
