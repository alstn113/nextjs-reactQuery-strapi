import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Link from "next/link";

import * as api from "../lib/api";

const Home = () => {
  const { data, isError, isLoading, error } = useQuery("review", () => api.getReviews());

  if (isLoading) return <div>loading...</div>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        {data &&
          data.map((review) => (
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
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("review", () => api.getReviews());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
