import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useRef } from "react";

import * as api from "../lib/api";

const Home = () => {
  const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery(
    "review_infinite",
    api.getReviewsInfinite,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );
  const loadMoreButtonRef = useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        {data.pages.map((group, i) => (
          <div key={i}>
            {group.data.map((review) => (
              <div key={review.id} className="review-card">
                <div className="rating">{review.rating}</div>
                <h2>{review.title}</h2>
                {review.categories.map((c) => (
                  <small key={c.id}>{c.name}</small>
                ))}
                <p>{review.body.substring(0, 100)}</p>
                <Link href="/details/[id]" as={`/details/${review.id}`}>
                  <a> Read More</a>
                </Link>
              </div>
            ))}
          </div>
        ))}
        <div className="load-more">
          <button ref={loadMoreButtonRef} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load Newer" : "Nothing more to load"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
