import { print, type DocumentNode } from "graphql";

const GRAPHQL_URL =
  process.env.GRAPHQL_URL ?? "http://localhost:5000/graphql";

/**
 * Server-side GraphQL fetch utility for use in React Server Components.
 * Converts a DocumentNode (from gql`…`) to a query string and sends
 * a standard POST request to the GraphQL endpoint.
 */
export async function graphqlFetch<
  TData,
  TVars extends Record<string, unknown> = Record<string, never>,
>(document: DocumentNode, variables?: TVars): Promise<TData> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: print(document), variables }),
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message ?? "Unknown GraphQL error");
  }

  return json.data as TData;
}
