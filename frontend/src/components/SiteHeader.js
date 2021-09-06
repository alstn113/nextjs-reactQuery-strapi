import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Link from "next/link";

import * as api from "../lib/api";

function SiteHeader() {
  const { data, isError, isLoading, error } = useQuery("category", () => api.getCategories());

  if (isLoading) return <div>loading...</div>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <div className="site-header">
      <Link href="/">
        <a>
          <h1>Minsoo Reviews</h1>
        </a>
      </Link>
      <Link href="/infinite">
        <a>
          <h1>Infinite Reviews</h1>
        </a>
      </Link>
      <nav className="categories">
        <span>Filter reviews by categories : </span>
        {data &&
          data.map((category) => (
            <Link key={category.id} href="/category/[id]" as={`/category/${category.id}`}>
              <a> {category.name}</a>
            </Link>
          ))}
      </nav>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("category", () => api.getCategories());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default SiteHeader;
