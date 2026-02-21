import { graphqlFetch } from "@/lib/graphql-server";
import { GET_AUTHOR } from "@/graphql/operations";
import type {
  GetAuthorQuery,
  GetAuthorQueryVariables,
} from "@/generated/graphql";
import ErrorMessage from "@/components/ErrorMessage";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import { ArrowLeft, User, Calendar, BookOpen } from "lucide-react";

type AuthorBook = NonNullable<GetAuthorQuery["authorById"]>["books"][number];

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await graphqlFetch<GetAuthorQuery, GetAuthorQueryVariables>(
    GET_AUTHOR,
    { id: parseInt(id) },
  );

  const author = data.authorById;
  if (!author) return <ErrorMessage message="Author not found" />;

  return (
    <div className="space-y-6">
      <Link
        href="/authors"
        className="inline-flex items-center gap-1 text-muted hover:text-foreground text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to authors
      </Link>

      <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            {author.photoUrl ? (
              <img
                src={author.photoUrl}
                alt={`${author.firstName} ${author.lastName}`}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {author.firstName} {author.lastName}
            </h1>
            {author.birthDate && (
              <div className="flex items-center gap-1.5 text-sm text-muted mt-1">
                <Calendar className="h-4 w-4" />
                Born {author.birthDate}
              </div>
            )}
            {author.biography && (
              <p className="text-muted mt-3 leading-relaxed max-w-2xl">
                {author.biography}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Author's books */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Books ({author.books.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {author.books.map((book: AuthorBook) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/40 transition-all"
            >
              <h3 className="font-semibold hover:text-primary transition-colors">
                {book.title}
              </h3>
              <span className="text-xs text-muted">{book.genre?.name}</span>
              <div className="mt-2">
                <StarRating rating={book.rating} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
