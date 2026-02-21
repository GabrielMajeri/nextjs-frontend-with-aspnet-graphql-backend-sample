"use client";

import { useMutation } from "@apollo/client/react";
import {
  DELETE_BOOK,
  GET_BOOKS,
  ADD_BOOK_TO_READING_LIST,
  GET_READING_LISTS,
} from "@/graphql/operations";
import type { GetReadingListsQuery } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, ListPlus } from "lucide-react";
import { useQuery } from "@apollo/client/react";

type ReadingListItem = GetReadingListsQuery["readingLists"][number];

interface BookActionsProps {
  bookId: number;
  bookTitle: string;
}

export default function BookActions({ bookId, bookTitle }: BookActionsProps) {
  const router = useRouter();
  const { data: listsData } = useQuery<GetReadingListsQuery>(GET_READING_LISTS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [addToList] = useMutation(ADD_BOOK_TO_READING_LIST, {
    refetchQueries: [{ query: GET_READING_LISTS }],
  });
  const [showListPicker, setShowListPicker] = useState(false);

  const readingLists: ReadingListItem[] = listsData?.readingLists ?? [];

  const handleDelete = async () => {
    if (!confirm(`Delete "${bookTitle}"?`)) return;
    await deleteBook({ variables: { id: bookId } });
    router.push("/books");
  };

  const handleAddToList = async (listId: number) => {
    try {
      await addToList({
        variables: { readingListId: listId, bookId },
      });
      setShowListPicker(false);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to add book";
      alert(message);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setShowListPicker(!showListPicker)}
          className="p-2 rounded-lg border border-border hover:bg-primary/10 hover:text-primary transition-colors"
          title="Add to reading list"
        >
          <ListPlus className="h-5 w-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg border border-border hover:bg-accent/10 hover:text-accent transition-colors"
          title="Delete book"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {showListPicker && (
        <div className="bg-surface border border-border rounded-lg p-3 space-y-2 shadow-lg">
          <p className="text-sm font-medium">Add to reading list:</p>
          {readingLists.map((list) => (
            <button
              key={list.id}
              onClick={() => handleAddToList(list.id)}
              className="block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-surface-hover transition-colors"
            >
              {list.name}
            </button>
          ))}
          {readingLists.length === 0 && (
            <p className="text-xs text-muted">No reading lists yet.</p>
          )}
        </div>
      )}
    </>
  );
}
