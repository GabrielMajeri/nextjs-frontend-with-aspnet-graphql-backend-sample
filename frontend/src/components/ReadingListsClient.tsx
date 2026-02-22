"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_READING_LISTS,
  CREATE_READING_LIST,
  DELETE_READING_LIST,
} from "@/graphql/operations";
import type { GetReadingListsQuery } from "@/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListChecks, Plus, Trash2, BookOpen, Calendar } from "lucide-react";

type ReadingListItem = GetReadingListsQuery["readingLists"][number];
type ReadingListBook = NonNullable<ReadingListItem["books"]>[number];

interface ReadingListsClientProps {
  initialLists: ReadingListItem[];
}

export default function ReadingListsClient({
  initialLists,
}: ReadingListsClientProps) {
  const router = useRouter();
  const [createList] = useMutation(CREATE_READING_LIST, {
    refetchQueries: [{ query: GET_READING_LISTS }],
  });
  const [deleteList] = useMutation(DELETE_READING_LIST, {
    refetchQueries: [{ query: GET_READING_LISTS }],
  });

  // Use Apollo query so the list stays in sync after mutations
  const { data } = useQuery<GetReadingListsQuery>(GET_READING_LISTS);
  const lists: ReadingListItem[] = data?.readingLists ?? initialLists;

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createList({
      variables: { input: { name, description: description || null } },
    });
    setName("");
    setDescription("");
    setShowForm(false);
    router.refresh();
  };

  const handleDelete = async (id: number, listName: string) => {
    if (!confirm(`Delete "${listName}"?`)) return;
    await deleteList({ variables: { id } });
    router.refresh();
  };

  const safeBooks = (
    books: ReadingListItem["books"],
  ): NonNullable<ReadingListBook>[] =>
    (books?.filter(Boolean) as NonNullable<ReadingListBook>[]) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reading Lists</h1>
          <p className="text-muted mt-1">
            Curate your personal book collections
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          New List
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-surface border border-border rounded-xl p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="e.g., Summer Reads 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Optional description…"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {lists.map((list) => {
          const books = safeBooks(list.books);
          return (
            <div
              key={list.id}
              className="bg-surface border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link href={`/reading-lists/${list.id}`} className="group">
                    <div className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {list.name}
                      </h3>
                    </div>
                  </Link>
                  {list.description && (
                    <p className="text-sm text-muted mt-1">
                      {list.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {books.length} book{books.length !== 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(list.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Book thumbnails */}
                <div className="hidden sm:flex items-center gap-1">
                  {books.slice(0, 3).map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md hover:bg-primary/20 transition-colors truncate max-w-[120px]"
                      title={book.title}
                    >
                      {book.title}
                    </Link>
                  ))}
                  {books.length > 3 && (
                    <span className="text-xs text-muted">
                      +{books.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(list.id, list.name)}
                  className="p-2 rounded-lg border border-border hover:bg-accent/10 hover:text-accent transition-colors flex-shrink-0"
                  title="Delete list"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {lists.length === 0 && (
        <p className="text-center text-muted py-12">
          No reading lists yet. Create one to get started!
        </p>
      )}
    </div>
  );
}
