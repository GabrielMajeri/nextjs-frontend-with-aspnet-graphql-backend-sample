export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  Decimal: { input: number; output: number; }
  LocalDate: { input: string; output: string; }
};

export type AddAuthorInput = {
  biography?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['LocalDate']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AddBookInput = {
  authorId: Scalars['Int']['input'];
  coverImageUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genreId: Scalars['Int']['input'];
  isbn: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  pageCount: Scalars['Int']['input'];
  publishedDate?: InputMaybe<Scalars['LocalDate']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  title: Scalars['String']['input'];
};

/** Represents an author of one or more books. */
export type Author = {
  __typename?: 'Author';
  biography?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['LocalDate']['output']>;
  books: Array<Book>;
  /** Author's first name. */
  firstName: Scalars['String']['output'];
  /** The unique identifier. */
  id: Scalars['Int']['output'];
  /** Author's last name. */
  lastName: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type AuthorFilterInput = {
  and?: InputMaybe<Array<AuthorFilterInput>>;
  biography?: InputMaybe<StringOperationFilterInput>;
  birthDate?: InputMaybe<LocalDateOperationFilterInput>;
  books?: InputMaybe<ListFilterInputTypeOfBookFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AuthorFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
};

export type AuthorSortInput = {
  biography?: InputMaybe<SortEnumType>;
  birthDate?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
};

/** Represents a book in the bookstore. */
export type Book = {
  __typename?: 'Book';
  author: Author;
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genre: Genre;
  /** The unique identifier of the book. */
  id: Scalars['Int']['output'];
  /** The ISBN of the book. */
  isbn: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  pageCount: Scalars['Int']['output'];
  publishedDate?: Maybe<Scalars['LocalDate']['output']>;
  /** Average reader rating (0.00 – 5.00). */
  rating?: Maybe<Scalars['Decimal']['output']>;
  /** The title of the book. */
  title: Scalars['String']['output'];
};

export type BookFilterInput = {
  and?: InputMaybe<Array<BookFilterInput>>;
  author?: InputMaybe<AuthorFilterInput>;
  authorId?: InputMaybe<IntOperationFilterInput>;
  coverImageUrl?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  genre?: InputMaybe<GenreFilterInput>;
  genreId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isbn?: InputMaybe<StringOperationFilterInput>;
  language?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BookFilterInput>>;
  pageCount?: InputMaybe<IntOperationFilterInput>;
  publishedDate?: InputMaybe<LocalDateOperationFilterInput>;
  rating?: InputMaybe<DecimalOperationFilterInput>;
  readingListBooks?: InputMaybe<ListFilterInputTypeOfReadingListBookFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type BookSortInput = {
  author?: InputMaybe<AuthorSortInput>;
  authorId?: InputMaybe<SortEnumType>;
  coverImageUrl?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  genre?: InputMaybe<GenreSortInput>;
  genreId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isbn?: InputMaybe<SortEnumType>;
  language?: InputMaybe<SortEnumType>;
  pageCount?: InputMaybe<SortEnumType>;
  publishedDate?: InputMaybe<SortEnumType>;
  rating?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type CreateReadingListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

/** A literary genre used to categorize books. */
export type Genre = {
  __typename?: 'Genre';
  books: Array<Book>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GenreFilterInput = {
  and?: InputMaybe<Array<GenreFilterInput>>;
  books?: InputMaybe<ListFilterInputTypeOfBookFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GenreFilterInput>>;
};

export type GenreSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfBookFilterInput = {
  all?: InputMaybe<BookFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BookFilterInput>;
  some?: InputMaybe<BookFilterInput>;
};

export type ListFilterInputTypeOfReadingListBookFilterInput = {
  all?: InputMaybe<ReadingListBookFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReadingListBookFilterInput>;
  some?: InputMaybe<ReadingListBookFilterInput>;
};

export type LocalDateOperationFilterInput = {
  eq?: InputMaybe<Scalars['LocalDate']['input']>;
  gt?: InputMaybe<Scalars['LocalDate']['input']>;
  gte?: InputMaybe<Scalars['LocalDate']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['LocalDate']['input']>>>;
  lt?: InputMaybe<Scalars['LocalDate']['input']>;
  lte?: InputMaybe<Scalars['LocalDate']['input']>;
  neq?: InputMaybe<Scalars['LocalDate']['input']>;
  ngt?: InputMaybe<Scalars['LocalDate']['input']>;
  ngte?: InputMaybe<Scalars['LocalDate']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['LocalDate']['input']>>>;
  nlt?: InputMaybe<Scalars['LocalDate']['input']>;
  nlte?: InputMaybe<Scalars['LocalDate']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: Author;
  addBook: Book;
  addBookToReadingList: ReadingList;
  createReadingList: ReadingList;
  deleteAuthor: Scalars['Boolean']['output'];
  deleteBook: Scalars['Boolean']['output'];
  deleteReadingList: Scalars['Boolean']['output'];
  removeBookFromReadingList: ReadingList;
  updateAuthor: Author;
  updateBook: Book;
};


export type MutationAddAuthorArgs = {
  input: AddAuthorInput;
};


export type MutationAddBookArgs = {
  input: AddBookInput;
};


export type MutationAddBookToReadingListArgs = {
  bookId: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  readingListId: Scalars['Int']['input'];
};


export type MutationCreateReadingListArgs = {
  input: CreateReadingListInput;
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteReadingListArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBookFromReadingListArgs = {
  bookId: Scalars['Int']['input'];
  readingListId: Scalars['Int']['input'];
};


export type MutationUpdateAuthorArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAuthorInput;
};


export type MutationUpdateBookArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBookInput;
};

export type Query = {
  __typename?: 'Query';
  authorById?: Maybe<Author>;
  authors: Array<Author>;
  bookById?: Maybe<Book>;
  books: Array<Book>;
  genres: Array<Genre>;
  readingListById?: Maybe<ReadingList>;
  readingLists: Array<ReadingList>;
};


export type QueryAuthorByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAuthorsArgs = {
  order?: InputMaybe<Array<AuthorSortInput>>;
  where?: InputMaybe<AuthorFilterInput>;
};


export type QueryBookByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBooksArgs = {
  order?: InputMaybe<Array<BookSortInput>>;
  where?: InputMaybe<BookFilterInput>;
};


export type QueryReadingListByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReadingListsArgs = {
  order?: InputMaybe<Array<ReadingListSortInput>>;
  where?: InputMaybe<ReadingListFilterInput>;
};

/** A curated reading list containing multiple books. */
export type ReadingList = {
  __typename?: 'ReadingList';
  /** Books in this reading list. */
  books?: Maybe<Array<Maybe<Book>>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ReadingListBookFilterInput = {
  addedAt?: InputMaybe<DateTimeOperationFilterInput>;
  and?: InputMaybe<Array<ReadingListBookFilterInput>>;
  book?: InputMaybe<BookFilterInput>;
  bookId?: InputMaybe<IntOperationFilterInput>;
  note?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ReadingListBookFilterInput>>;
  readingList?: InputMaybe<ReadingListFilterInput>;
  readingListId?: InputMaybe<IntOperationFilterInput>;
};

export type ReadingListFilterInput = {
  and?: InputMaybe<Array<ReadingListFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ReadingListFilterInput>>;
  readingListBooks?: InputMaybe<ListFilterInputTypeOfReadingListBookFilterInput>;
};

export type ReadingListSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAuthorInput = {
  biography?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['LocalDate']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookInput = {
  authorId?: InputMaybe<Scalars['Int']['input']>;
  coverImageUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  pageCount?: InputMaybe<Scalars['Int']['input']>;
  publishedDate?: InputMaybe<Scalars['LocalDate']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BookFieldsFragment = { __typename?: 'Book', id: number, title: string, description?: string | null, isbn: string, pageCount: number, publishedDate?: string | null, coverImageUrl?: string | null, language?: string | null, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string }, genre: { __typename?: 'Genre', id: number, name: string } };

export type AuthorFieldsFragment = { __typename?: 'Author', id: number, firstName: string, lastName: string, biography?: string | null, birthDate?: string | null, photoUrl?: string | null, books: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, genre: { __typename?: 'Genre', name: string } }> };

export type ReadingListFieldsFragment = { __typename?: 'ReadingList', id: number, name: string, description?: string | null, createdAt: string, books?: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } } | null> | null };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: number, title: string, description?: string | null, isbn: string, pageCount: number, publishedDate?: string | null, coverImageUrl?: string | null, language?: string | null, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string }, genre: { __typename?: 'Genre', id: number, name: string } }> };

export type GetBookQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBookQuery = { __typename?: 'Query', bookById?: { __typename?: 'Book', id: number, title: string, description?: string | null, isbn: string, pageCount: number, publishedDate?: string | null, coverImageUrl?: string | null, language?: string | null, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string }, genre: { __typename?: 'Genre', id: number, name: string } } | null };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', id: number, firstName: string, lastName: string, biography?: string | null, birthDate?: string | null, photoUrl?: string | null, books: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, genre: { __typename?: 'Genre', name: string } }> }> };

export type GetAuthorQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetAuthorQuery = { __typename?: 'Query', authorById?: { __typename?: 'Author', id: number, firstName: string, lastName: string, biography?: string | null, birthDate?: string | null, photoUrl?: string | null, books: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, genre: { __typename?: 'Genre', name: string } }> } | null };

export type GetGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGenresQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, description?: string | null }> };

export type GetReadingListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReadingListsQuery = { __typename?: 'Query', readingLists: Array<{ __typename?: 'ReadingList', id: number, name: string, description?: string | null, createdAt: string, books?: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } } | null> | null }> };

export type GetReadingListQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetReadingListQuery = { __typename?: 'Query', readingListById?: { __typename?: 'ReadingList', id: number, name: string, description?: string | null, createdAt: string, books?: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } } | null> | null } | null };

export type AddBookMutationVariables = Exact<{
  input: AddBookInput;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', id: number, title: string, description?: string | null, isbn: string, pageCount: number, publishedDate?: string | null, coverImageUrl?: string | null, language?: string | null, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string }, genre: { __typename?: 'Genre', id: number, name: string } } };

export type UpdateBookMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateBookInput;
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook: { __typename?: 'Book', id: number, title: string, description?: string | null, isbn: string, pageCount: number, publishedDate?: string | null, coverImageUrl?: string | null, language?: string | null, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string }, genre: { __typename?: 'Genre', id: number, name: string } } };

export type DeleteBookMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: boolean };

export type AddAuthorMutationVariables = Exact<{
  input: AddAuthorInput;
}>;


export type AddAuthorMutation = { __typename?: 'Mutation', addAuthor: { __typename?: 'Author', id: number, firstName: string, lastName: string, biography?: string | null } };

export type CreateReadingListMutationVariables = Exact<{
  input: CreateReadingListInput;
}>;


export type CreateReadingListMutation = { __typename?: 'Mutation', createReadingList: { __typename?: 'ReadingList', id: number, name: string, description?: string | null, createdAt: string, books?: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } } | null> | null } };

export type AddBookToReadingListMutationVariables = Exact<{
  readingListId: Scalars['Int']['input'];
  bookId: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddBookToReadingListMutation = { __typename?: 'Mutation', addBookToReadingList: { __typename?: 'ReadingList', id: number, name: string, description?: string | null, createdAt: string, books?: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } } | null> | null } };

export type RemoveBookFromReadingListMutationVariables = Exact<{
  readingListId: Scalars['Int']['input'];
  bookId: Scalars['Int']['input'];
}>;


export type RemoveBookFromReadingListMutation = { __typename?: 'Mutation', removeBookFromReadingList: { __typename?: 'ReadingList', id: number, name: string, description?: string | null, createdAt: string, books?: Array<{ __typename?: 'Book', id: number, title: string, rating?: number | null, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } } | null> | null } };

export type DeleteReadingListMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteReadingListMutation = { __typename?: 'Mutation', deleteReadingList: boolean };
