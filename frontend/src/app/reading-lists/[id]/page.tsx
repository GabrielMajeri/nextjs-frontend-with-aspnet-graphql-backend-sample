import { graphqlFetch } from "@/lib/graphql-server";
import { GET_READING_LIST } from "@/graphql/operations";
import type {
  GetReadingListQuery,
  GetReadingListQueryVariables,
  ReadingListFieldsFragment,
} from "@/generated/graphql";
import ErrorMessage from "@/components/ErrorMessage";
import ReadingListBooks from "@/components/ReadingListBooks";
import Link from "next/link";
import { ArrowLeft, ListChecks, BookOpen, Calendar } from "lucide-react";

type ReadingListBook = NonNullable<
  NonNullable<ReadingListFieldsFragment["books"]>[number]
>;

export default async function ReadingListDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await graphqlFetch<
    GetReadingListQuery,
    GetReadingListQueryVariables
  >(GET_READING_LIST, { id: parseInt(id) });

  const list = data.readingListById;
  if (!list) return <ErrorMessage message="Reading list not found" />;

  const books: ReadingListBook[] = (list.books?.filter(Boolean) ??
    []) as ReadingListBook[];

  return (
    <div className="space-y-6">
      <Link
        href="/reading-lists"
        className="inline-flex items-center gap-1 text-muted hover:text-foreground text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to reading lists
      </Link>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <ListChecks className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">{list.name}</h1>
        </div>
        {list.description && <p className="text-muted">{list.description}</p>}
        <div className="flex items-center gap-4 mt-3 text-sm text-muted">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {books.length} book{books.length !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Created {new Date(list.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <ReadingListBooks readingListId={list.id} books={books} />
    </div>
  );
}
