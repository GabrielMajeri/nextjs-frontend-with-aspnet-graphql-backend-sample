"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Plus, Search } from "lucide-react";
import type { GetAuthorsQuery } from "@/generated/graphql";

type AuthorItem = GetAuthorsQuery["authors"][number];

interface AuthorSearchGridProps {
  authors: AuthorItem[];
}

export default function AuthorSearchGrid({ authors }: AuthorSearchGridProps) {
  const [search, setSearch] = useState("");

  const filtered = authors.filter((a) =>
    `${a.firstName} ${a.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Authors</h1>
          <p className="text-muted mt-1">
            {authors.length} authors in the collection
          </p>
        </div>
        <Link
          href="/authors/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Author
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search authors…"
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.id}`}
            className="group bg-surface border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                {author.photoUrl ? (
                  <img
                    src={author.photoUrl}
                    alt={`${author.firstName} ${author.lastName}`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-7 w-7 text-primary" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {author.firstName} {author.lastName}
                </h3>
                {author.biography && (
                  <p className="text-sm text-muted mt-1 line-clamp-2">
                    {author.biography}
                  </p>
                )}
                <p className="text-xs text-muted mt-2">
                  {author.books.length} book
                  {author.books.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
