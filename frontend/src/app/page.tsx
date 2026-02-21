import { graphqlFetch } from "@/lib/graphql-server";
import {
  GET_BOOKS,
  GET_AUTHORS,
  GET_READING_LISTS,
} from "@/graphql/operations";
import type {
  GetBooksQuery,
  GetAuthorsQuery,
  GetReadingListsQuery,
} from "@/generated/graphql";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { BookOpen, Users, ListChecks, ArrowRight } from "lucide-react";

type BookItem = GetBooksQuery["books"][number];

export default async function HomePage() {
  const [booksData, authorsData, readingListsData] = await Promise.all([
    graphqlFetch<GetBooksQuery>(GET_BOOKS),
    graphqlFetch<GetAuthorsQuery>(GET_AUTHORS),
    graphqlFetch<GetReadingListsQuery>(GET_READING_LISTS),
  ]);

  const books = booksData.books ?? [];
  const authors = authorsData.authors ?? [];
  const readingLists = readingListsData.readingLists ?? [];

  // Top rated books
  const topBooks: BookItem[] = [...books]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">BookVault</span>
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Manage your digital bookstore — browse books, discover authors, and
          curate reading lists. Built with{" "}
          <span className="font-semibold text-foreground">Next.js</span>,{" "}
          <span className="font-semibold text-foreground">ASP.NET</span> &{" "}
          <span className="font-semibold text-foreground">GraphQL</span>.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            label: "Books",
            value: books.length,
            icon: BookOpen,
            href: "/books",
            color: "text-primary",
          },
          {
            label: "Authors",
            value: authors.length,
            icon: Users,
            href: "/authors",
            color: "text-success",
          },
          {
            label: "Reading Lists",
            value: readingLists.length,
            icon: ListChecks,
            href: "/reading-lists",
            color: "text-warning",
          },
        ].map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-surface border border-border rounded-xl p-6 flex items-center gap-4 hover:shadow-md hover:border-primary/40 transition-all"
          >
            <Icon className={`h-10 w-10 ${color}`} />
            <div>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm text-muted">{label}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Top Rated Books */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top Rated Books</h2>
          <Link
            href="/books"
            className="text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              rating={book.rating}
              coverImageUrl={book.coverImageUrl}
              pageCount={book.pageCount}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
