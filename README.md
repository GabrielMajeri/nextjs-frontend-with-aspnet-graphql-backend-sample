# BookVault — Next.js + ASP.NET + GraphQL Sample App

A full-stack digital bookstore/library management application showcasing the integration of a **React + Next.js** front end with an **ASP.NET Core** back end, using **GraphQL** (Hot Chocolate + Apollo Client) for type-safe, efficient communication.

![Stack](https://img.shields.io/badge/Frontend-Next.js_16-black?style=flat-square)
![Stack](https://img.shields.io/badge/Backend-ASP.NET_Core_10-purple?style=flat-square)
![Stack](https://img.shields.io/badge/API-GraphQL-e535ab?style=flat-square)
![Stack](https://img.shields.io/badge/DB-SQLite-blue?style=flat-square)

## Features

- **Books** — Browse, search, add, and delete books with full details (title, author, genre, rating, ISBN, etc.)
- **Authors** — View author profiles and their book catalogs
- **Reading Lists** — Create curated reading lists, add/remove books
- **GraphQL API** — Fully typed queries, mutations, filtering, and sorting
- **Type Safety** — End-to-end from C# models → GraphQL schema → generated TypeScript types
- **Modern UI** — Responsive design with Tailwind CSS, dark mode support

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download) (or later)
- [Node.js 20+](https://nodejs.org/) with npm

## Quick Start

### 1. Start the Backend

```bash
cd backend/BookStore.Api
dotnet run --urls "http://localhost:5000"
```

The GraphQL endpoint will be available at **http://localhost:5000/graphql**
The interactive GraphQL IDE (Banana Cake Pop) is at the same URL in a browser.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## Project Structure

```
├── backend/
│   └── BookStore.Api/        # ASP.NET Core 10 + Hot Chocolate GraphQL
│       ├── Models/            # Domain entities (Book, Author, Genre, ReadingList)
│       ├── Data/              # EF Core DbContext & seed data
│       └── GraphQL/           # Queries, mutations & type configurations
├── frontend/
│   └── src/
│       ├── app/               # Next.js App Router pages
│       ├── components/        # Shared React components
│       ├── graphql/           # GraphQL operations (queries & mutations)
│       ├── generated/         # Auto-generated TypeScript types
│       └── lib/               # Apollo Client setup
├── ARCHITECTURE.md            # Detailed architecture documentation
└── README.md                  # This file
```

## GraphQL Code Generation

To regenerate TypeScript types after schema changes:

```bash
# Ensure the backend is running first
cd frontend
npm run codegen
```

This introspects the Hot Chocolate schema and generates typed query/mutation result types in `src/generated/graphql.ts`.

## Sample GraphQL Queries

Try these in the Banana Cake Pop IDE at http://localhost:5000/graphql:

```graphql
# Get all books with their authors and genres
query {
  books {
    title
    rating
    author {
      firstName
      lastName
    }
    genre {
      name
    }
  }
}

# Get a specific reading list
query {
  readingListById(id: 1) {
    name
    description
    books {
      title
      author {
        firstName
        lastName
      }
    }
  }
}

# Add a book to a reading list
mutation {
  addBookToReadingList(readingListId: 1, bookId: 4, note: "Great read!") {
    name
    books {
      title
    }
  }
}
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed breakdown of:

- Technology stack and rationale
- Data model and relationships
- GraphQL API reference
- Type safety pipeline
- Design decisions

## Tech Stack

| Layer           | Technology              | Purpose                          |
| --------------- | ----------------------- | -------------------------------- |
| Frontend        | Next.js 16 (App Router) | React framework with SSR support |
| Styling         | Tailwind CSS v4         | Utility-first CSS                |
| GraphQL Client  | Apollo Client v4        | Type-safe data fetching          |
| Type Generation | GraphQL Code Generator  | Auto-generated TypeScript types  |
| Backend         | ASP.NET Core 10         | Web API framework                |
| GraphQL Server  | Hot Chocolate v14       | .NET GraphQL server              |
| ORM             | Entity Framework Core   | Database access                  |
| Database        | SQLite                  | Zero-config relational database  |

## License

This is a sample/demo application for educational purposes.
