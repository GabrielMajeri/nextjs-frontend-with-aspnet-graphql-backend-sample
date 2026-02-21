import { graphqlFetch } from "@/lib/graphql-server";
import { GET_READING_LISTS } from "@/graphql/operations";
import type { GetReadingListsQuery } from "@/generated/graphql";
import ReadingListsClient from "@/components/ReadingListsClient";

export default async function ReadingListsPage() {
  const data = await graphqlFetch<GetReadingListsQuery>(GET_READING_LISTS);
  return <ReadingListsClient initialLists={data.readingLists} />;
}
