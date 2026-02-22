"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  GET_READING_LIST,
  GET_READING_LISTS,
  REMOVE_BOOK_FROM_READING_LIST,
} from "@/graphql/operations";
import type { ReadingListFieldsFragment } from "@/generated/graphql";
import StarRating from "./StarRating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, BookOpen } from "lucide-react";

/** A single book entry inside a reading list (non-null). */
type ReadingListBook = NonNullable<
  NonNullable<ReadingListFieldsFragment["books"]>[number]
>;

interface ReadingListBooksProps {
  readingListId: number;
  books: ReadingListBook[];
}

export default function ReadingListBooks({
  readingListId,
  books: initialBooks,
}: ReadingListBooksProps) {
  const router = useRouter();
  const [books, setBooks] = useState(initialBooks);

  const [removeBook] = useMutation(REMOVE_BOOK_FROM_READING_LIST, {
    refetchQueries: [
      { query: GET_READING_LIST, variables: { id: readingListId } },
      { query: GET_READING_LISTS },
    ],
  });

  const handleRemove = async (bookId: number, bookTitle: string) => {
    if (!confirm(`Remove "${bookTitle}" from this list?`)) return;
    // Optimistic: remove immediately from local state
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    await removeBook({
      variables: { readingListId, bookId },
    });
    router.refresh();
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted/50" />
        <p>This reading list is empty.</p>
        <Link
          href="/books"
          className="text-primary text-sm hover:underline mt-1 inline-block"
        >
          Browse books to add some
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow"
        >
          <Link href={`/books/${book.id}`} className="flex-1 min-w-0 group">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted">
              by {book.author.firstName} {book.author.lastName}
            </p>
            <div className="mt-1">
              <StarRating rating={book.rating} />
            </div>
          </Link>
          <button
            onClick={() => handleRemove(book.id, book.title)}
            className="p-2 rounded-lg border border-border hover:bg-accent/10 hover:text-accent transition-colors flex-shrink-0"
            title="Remove from list"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
