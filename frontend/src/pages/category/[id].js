import { useRouter } from "next/dist/client/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Link from "next/link";

import * as api from "../../lib/api";

function Category() {
  const {
    query: { id },
  } = useRouter();
  const { data, isError, isLoading, error } = useQuery(["category", id], () => api.getCategoryById(id), {
    enabled: !!id,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data && (
        <div>
          <h2>{data.name}</h2>
          {data.reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="rating">{review.rating}</div>
              <h2>{review.title}</h2>
              <p>{review.body.substring(0, 100)}</p>
              <Link href="/details/[id]" as={`/details/${review.id}`}>
                <a> Read More</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["category", id], () => api.getCategoryById(id), {
    enabled: !!id,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Category;
