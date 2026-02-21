"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import BookCard from "./BookCard";
import type { GetBooksQuery } from "@/generated/graphql";

type BookItem = GetBooksQuery["books"][number];

interface BookSearchGridProps {
  books: BookItem[];
}

export default function BookSearchGrid({ books }: BookSearchGridProps) {
  const [search, setSearch] = useState("");

  const filtered = books.filter((b) =>
    `${b.title} ${b.author.firstName} ${b.author.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Books</h1>
          <p className="text-muted mt-1">
            Browse the entire collection ({books.length} titles)
          </p>
        </div>
        <Link
          href="/books/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Book
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author…"
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((book) => (
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

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">
          {search ? "No books match your search." : "No books found."}
        </p>
      )}
    </div>
  );
}
