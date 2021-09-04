import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import * as api from "../../lib/api";

function ReviewDetails() {
  const {
    query: { id },
  } = useRouter();

  const { data, isError, isLoading, error } = useQuery(["review", id], () => api.getReviewById(id), {
    enabled: !!id,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data && (
        <div className="review-card">
          <div className="rating">{data.rating}</div>
          <h2>{data.title}</h2>
          {data.categories.map((c) => (
            <small key={c.id}>{c.name}</small>
          ))}

          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["review", id], () => api.getReviewById(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ReviewDetails;
