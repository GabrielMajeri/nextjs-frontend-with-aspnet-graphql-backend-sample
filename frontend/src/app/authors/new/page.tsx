"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { ADD_AUTHOR, GET_AUTHORS } from "@/graphql/operations";
import { useMutation } from "@apollo/client/react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function NewAuthorPage() {
  const router = useRouter();
  const [addAuthor, { loading, error }] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    biography: "",
    birthDate: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addAuthor({
      variables: {
        input: {
          firstName: form.firstName,
          lastName: form.lastName,
          biography: form.biography || null,
          birthDate: form.birthDate || null,
        },
      },
    });
    router.push("/authors");
  };

  const inputClass =
    "w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/authors"
        className="inline-flex items-center gap-1 text-muted hover:text-foreground text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to authors
      </Link>

      <h1 className="text-3xl font-bold">Add New Author</h1>

      {error && <ErrorMessage message={error.message} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name *</label>
            <input
              className={inputClass}
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              className={inputClass}
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Biography</label>
          <textarea
            className={`${inputClass} h-24 resize-none`}
            value={form.biography}
            onChange={(e) => update("biography", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Birth Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Saving…" : "Save Author"}
        </button>
      </form>
    </div>
  );
}
