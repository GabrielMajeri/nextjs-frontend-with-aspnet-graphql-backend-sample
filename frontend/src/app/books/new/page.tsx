"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import {
  ADD_BOOK,
  GET_BOOKS,
  GET_AUTHORS,
  GET_GENRES,
} from "@/graphql/operations";
import type { GetAuthorsQuery, GetGenresQuery } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";

export default function NewBookPage() {
  const router = useRouter();
  const { data: authorsData } = useQuery<GetAuthorsQuery>(GET_AUTHORS);
  const { data: genresData } = useQuery<GetGenresQuery>(GET_GENRES);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    isbn: "",
    pageCount: 0,
    publishedDate: "",
    language: "English",
    rating: 0,
    authorId: 0,
    genreId: 0,
  });

  const update = (field: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook({
      variables: {
        input: {
          ...form,
          pageCount: Number(form.pageCount),
          rating: Number(form.rating) || null,
          authorId: Number(form.authorId),
          genreId: Number(form.genreId),
          publishedDate: form.publishedDate || null,
        },
      },
    });
    router.push("/books");
  };

  const authors = authorsData?.authors ?? [];
  const genres = genresData?.genres ?? [];

  const inputClass =
    "w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/books"
        className="inline-flex items-center gap-1 text-muted hover:text-foreground text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to books
      </Link>

      <h1 className="text-3xl font-bold">Add New Book</h1>

      {error && <ErrorMessage message={error.message} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={`${inputClass} h-24 resize-none`}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>ISBN *</label>
            <input
              className={inputClass}
              required
              value={form.isbn}
              onChange={(e) => update("isbn", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Page Count</label>
            <input
              type="number"
              className={inputClass}
              value={form.pageCount || ""}
              onChange={(e) => update("pageCount", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Author *</label>
            <select
              className={inputClass}
              required
              value={form.authorId}
              onChange={(e) => update("authorId", e.target.value)}
            >
              <option value="">Select author…</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.firstName} {a.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Genre *</label>
            <select
              className={inputClass}
              required
              value={form.genreId}
              onChange={(e) => update("genreId", e.target.value)}
            >
              <option value="">Select genre…</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Published Date</label>
            <input
              type="date"
              className={inputClass}
              value={form.publishedDate}
              onChange={(e) => update("publishedDate", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Language</label>
            <input
              className={inputClass}
              value={form.language}
              onChange={(e) => update("language", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className={inputClass}
              value={form.rating || ""}
              onChange={(e) => update("rating", e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Saving…" : "Save Book"}
        </button>
      </form>
    </div>
  );
}
