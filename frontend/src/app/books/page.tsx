import { graphqlFetch } from "@/lib/graphql-server";
import { GET_BOOKS } from "@/graphql/operations";
import type { GetBooksQuery } from "@/generated/graphql";
import BookSearchGrid from "@/components/BookSearchGrid";

export default async function BooksPage() {
  const data = await graphqlFetch<GetBooksQuery>(GET_BOOKS);
  return <BookSearchGrid books={data.books} />;
}
