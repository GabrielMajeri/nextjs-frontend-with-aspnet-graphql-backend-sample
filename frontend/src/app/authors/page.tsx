import { graphqlFetch } from "@/lib/graphql-server";
import { GET_AUTHORS } from "@/graphql/operations";
import type { GetAuthorsQuery } from "@/generated/graphql";
import AuthorSearchGrid from "@/components/AuthorSearchGrid";

export default async function AuthorsPage() {
  const data = await graphqlFetch<GetAuthorsQuery>(GET_AUTHORS);
  return <AuthorSearchGrid authors={data.authors} />;
}
