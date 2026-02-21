import { gql } from "@apollo/client";

// ─── Fragments ─────────────────────────────────────────────────

export const BOOK_FIELDS = gql`
  fragment BookFields on Book {
    id
    title
    description
    isbn
    pageCount
    publishedDate
    coverImageUrl
    language
    rating
    author {
      id
      firstName
      lastName
    }
    genre {
      id
      name
    }
  }
`;

export const AUTHOR_FIELDS = gql`
  fragment AuthorFields on Author {
    id
    firstName
    lastName
    biography
    birthDate
    photoUrl
    books {
      id
      title
      rating
      genre {
        name
      }
    }
  }
`;

export const READING_LIST_FIELDS = gql`
  fragment ReadingListFields on ReadingList {
    id
    name
    description
    createdAt
    books {
      id
      title
      rating
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

// ─── Queries ───────────────────────────────────────────────────

export const GET_BOOKS = gql`
  ${BOOK_FIELDS}
  query GetBooks {
    books {
      ...BookFields
    }
  }
`;

export const GET_BOOK = gql`
  ${BOOK_FIELDS}
  query GetBook($id: Int!) {
    bookById(id: $id) {
      ...BookFields
    }
  }
`;

export const GET_AUTHORS = gql`
  ${AUTHOR_FIELDS}
  query GetAuthors {
    authors {
      ...AuthorFields
    }
  }
`;

export const GET_AUTHOR = gql`
  ${AUTHOR_FIELDS}
  query GetAuthor($id: Int!) {
    authorById(id: $id) {
      ...AuthorFields
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
      description
    }
  }
`;

export const GET_READING_LISTS = gql`
  ${READING_LIST_FIELDS}
  query GetReadingLists {
    readingLists {
      ...ReadingListFields
    }
  }
`;

export const GET_READING_LIST = gql`
  ${READING_LIST_FIELDS}
  query GetReadingList($id: Int!) {
    readingListById(id: $id) {
      ...ReadingListFields
    }
  }
`;

// ─── Mutations ─────────────────────────────────────────────────

export const ADD_BOOK = gql`
  ${BOOK_FIELDS}
  mutation AddBook($input: AddBookInput!) {
    addBook(input: $input) {
      ...BookFields
    }
  }
`;

export const UPDATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation UpdateBook($id: Int!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      ...BookFields
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id)
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($input: AddAuthorInput!) {
    addAuthor(input: $input) {
      id
      firstName
      lastName
      biography
    }
  }
`;

export const CREATE_READING_LIST = gql`
  ${READING_LIST_FIELDS}
  mutation CreateReadingList($input: CreateReadingListInput!) {
    createReadingList(input: $input) {
      ...ReadingListFields
    }
  }
`;

export const ADD_BOOK_TO_READING_LIST = gql`
  ${READING_LIST_FIELDS}
  mutation AddBookToReadingList(
    $readingListId: Int!
    $bookId: Int!
    $note: String
  ) {
    addBookToReadingList(
      readingListId: $readingListId
      bookId: $bookId
      note: $note
    ) {
      ...ReadingListFields
    }
  }
`;

export const REMOVE_BOOK_FROM_READING_LIST = gql`
  ${READING_LIST_FIELDS}
  mutation RemoveBookFromReadingList($readingListId: Int!, $bookId: Int!) {
    removeBookFromReadingList(
      readingListId: $readingListId
      bookId: $bookId
    ) {
      ...ReadingListFields
    }
  }
`;

export const DELETE_READING_LIST = gql`
  mutation DeleteReadingList($id: Int!) {
    deleteReadingList(id: $id)
  }
`;
