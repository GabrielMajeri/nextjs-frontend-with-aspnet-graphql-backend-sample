import { graphqlFetch } from "@/lib/graphql-server";
import { GET_BOOK } from "@/graphql/operations";
import type { GetBookQuery, GetBookQueryVariables } from "@/generated/graphql";
import ErrorMessage from "@/components/ErrorMessage";
import StarRating from "@/components/StarRating";
import BookActions from "@/components/BookActions";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Globe,
  Hash,
  FileText,
} from "lucide-react";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await graphqlFetch<GetBookQuery, GetBookQueryVariables>(
    GET_BOOK,
    { id: parseInt(id) },
  );

  const book = data.bookById;
  if (!book) return <ErrorMessage message="Book not found" />;

  return (
    <div className="space-y-6">
      <Link
        href="/books"
        className="inline-flex items-center gap-1 text-muted hover:text-foreground text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to books
      </Link>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="md:flex">
          {/* Cover Section */}
          <div className="md:w-1/3 h-64 md:h-auto bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <BookOpen className="h-24 w-24 text-primary/30" />
            )}
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-6 md:p-8 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                  {book.genre.name}
                </span>
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <Link
                  href={`/authors/${book.author.id}`}
                  className="text-muted hover:text-primary transition-colors"
                >
                  by {book.author.firstName} {book.author.lastName}
                </Link>
              </div>
              <BookActions bookId={book.id} bookTitle={book.title} />
            </div>

            <StarRating rating={book.rating} />

            {book.description && (
              <p className="text-muted leading-relaxed">{book.description}</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Hash className="h-4 w-4 text-muted" />
                <span className="text-muted">ISBN:</span>
                <span className="font-mono text-xs">{book.isbn}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted" />
                <span className="text-muted">Pages:</span>
                <span>{book.pageCount}</span>
              </div>
              {book.publishedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted" />
                  <span className="text-muted">Published:</span>
                  <span>{book.publishedDate}</span>
                </div>
              )}
              {book.language && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted" />
                  <span className="text-muted">Language:</span>
                  <span>{book.language}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
