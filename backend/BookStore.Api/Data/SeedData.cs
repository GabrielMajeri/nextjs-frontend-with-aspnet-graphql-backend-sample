using BookStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.Data;

public static class SeedData
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        // Genres
        modelBuilder.Entity<Genre>().HasData(
            new Genre { Id = 1, Name = "Fiction", Description = "Literary and general fiction" },
            new Genre { Id = 2, Name = "Science Fiction", Description = "Speculative fiction dealing with futuristic concepts" },
            new Genre { Id = 3, Name = "Fantasy", Description = "Fiction involving magical or supernatural elements" },
            new Genre { Id = 4, Name = "Non-Fiction", Description = "Factual and informational works" },
            new Genre { Id = 5, Name = "Mystery", Description = "Fiction dealing with the solution of a crime or puzzle" },
            new Genre { Id = 6, Name = "Romance", Description = "Fiction focused on romantic relationships" },
            new Genre { Id = 7, Name = "Biography", Description = "Accounts of someone's life written by another" }
        );

        // Authors
        modelBuilder.Entity<Author>().HasData(
            new Author
            {
                Id = 1,
                FirstName = "Frank",
                LastName = "Herbert",
                Biography = "American science-fiction author best known for the novel Dune.",
                BirthDate = new DateOnly(1920, 10, 8)
            },
            new Author
            {
                Id = 2,
                FirstName = "J.R.R.",
                LastName = "Tolkien",
                Biography = "English writer and philologist, author of The Lord of the Rings.",
                BirthDate = new DateOnly(1892, 1, 3)
            },
            new Author
            {
                Id = 3,
                FirstName = "Jane",
                LastName = "Austen",
                Biography = "English novelist known for her six major novels interpreting 18th-century British landed gentry.",
                BirthDate = new DateOnly(1775, 12, 16)
            },
            new Author
            {
                Id = 4,
                FirstName = "George",
                LastName = "Orwell",
                Biography = "English novelist, essayist, and critic famous for his novels Animal Farm and 1984.",
                BirthDate = new DateOnly(1903, 6, 25)
            },
            new Author
            {
                Id = 5,
                FirstName = "Agatha",
                LastName = "Christie",
                Biography = "English writer known for her detective novels featuring Hercule Poirot and Miss Marple.",
                BirthDate = new DateOnly(1890, 9, 15)
            },
            new Author
            {
                Id = 6,
                FirstName = "Isaac",
                LastName = "Asimov",
                Biography = "American writer and professor of biochemistry, known for his works of science fiction.",
                BirthDate = new DateOnly(1920, 1, 2)
            }
        );

        // Books
        modelBuilder.Entity<Book>().HasData(
            new Book
            {
                Id = 1,
                Title = "Dune",
                Isbn = "978-0-441-17271-9",
                Description = "Set in the distant future, Dune tells the story of Paul Atreides as he and his family accept control of the desert planet Arrakis.",
                PageCount = 688,
                PublishedDate = new DateOnly(1965, 8, 1),
                Language = "English",
                Rating = 4.8m,
                AuthorId = 1,
                GenreId = 2
            },
            new Book
            {
                Id = 2,
                Title = "Dune Messiah",
                Isbn = "978-0-593-09880-0",
                Description = "The second novel in the Dune series, continuing Paul Atreides' story twelve years after the events of Dune.",
                PageCount = 256,
                PublishedDate = new DateOnly(1969, 1, 1),
                Language = "English",
                Rating = 4.3m,
                AuthorId = 1,
                GenreId = 2
            },
            new Book
            {
                Id = 3,
                Title = "The Lord of the Rings",
                Isbn = "978-0-618-64015-7",
                Description = "An epic high-fantasy novel that follows hobbits as they quest to destroy the One Ring.",
                PageCount = 1178,
                PublishedDate = new DateOnly(1954, 7, 29),
                Language = "English",
                Rating = 4.9m,
                AuthorId = 2,
                GenreId = 3
            },
            new Book
            {
                Id = 4,
                Title = "The Hobbit",
                Isbn = "978-0-547-92822-7",
                Description = "A children's fantasy novel about the adventures of hobbit Bilbo Baggins.",
                PageCount = 310,
                PublishedDate = new DateOnly(1937, 9, 21),
                Language = "English",
                Rating = 4.7m,
                AuthorId = 2,
                GenreId = 3
            },
            new Book
            {
                Id = 5,
                Title = "Pride and Prejudice",
                Isbn = "978-0-14-143951-8",
                Description = "A romantic novel following Elizabeth Bennet as she navigates issues of manners, morality, and marriage.",
                PageCount = 432,
                PublishedDate = new DateOnly(1813, 1, 28),
                Language = "English",
                Rating = 4.6m,
                AuthorId = 3,
                GenreId = 1
            },
            new Book
            {
                Id = 6,
                Title = "Sense and Sensibility",
                Isbn = "978-0-14-143966-2",
                Description = "A novel about two sisters, Elinor and Marianne Dashwood, and their experiences in love and life.",
                PageCount = 409,
                PublishedDate = new DateOnly(1811, 1, 1),
                Language = "English",
                Rating = 4.3m,
                AuthorId = 3,
                GenreId = 1
            },
            new Book
            {
                Id = 7,
                Title = "1984",
                Isbn = "978-0-451-52493-5",
                Description = "A dystopian novel set in a totalitarian society ruled by Big Brother.",
                PageCount = 328,
                PublishedDate = new DateOnly(1949, 6, 8),
                Language = "English",
                Rating = 4.7m,
                AuthorId = 4,
                GenreId = 2
            },
            new Book
            {
                Id = 8,
                Title = "Animal Farm",
                Isbn = "978-0-451-52634-2",
                Description = "An allegorical novella reflecting events leading to the Russian Revolution and the Stalinist era.",
                PageCount = 112,
                PublishedDate = new DateOnly(1945, 8, 17),
                Language = "English",
                Rating = 4.5m,
                AuthorId = 4,
                GenreId = 1
            },
            new Book
            {
                Id = 9,
                Title = "Murder on the Orient Express",
                Isbn = "978-0-06-269366-2",
                Description = "A detective novel featuring Hercule Poirot solving a murder on a luxury train.",
                PageCount = 274,
                PublishedDate = new DateOnly(1934, 1, 1),
                Language = "English",
                Rating = 4.4m,
                AuthorId = 5,
                GenreId = 5
            },
            new Book
            {
                Id = 10,
                Title = "Foundation",
                Isbn = "978-0-553-29335-7",
                Description = "The first novel in Asimov's Foundation series about the fall of a Galactic Empire.",
                PageCount = 244,
                PublishedDate = new DateOnly(1951, 1, 1),
                Language = "English",
                Rating = 4.6m,
                AuthorId = 6,
                GenreId = 2
            }
        );

        // Reading Lists
        modelBuilder.Entity<ReadingList>().HasData(
            new ReadingList
            {
                Id = 1,
                Name = "Sci-Fi Essentials",
                Description = "Must-read science fiction classics",
                CreatedAt = new DateTime(2025, 1, 15, 0, 0, 0, DateTimeKind.Utc)
            },
            new ReadingList
            {
                Id = 2,
                Name = "British Classics",
                Description = "Essential works of British literature",
                CreatedAt = new DateTime(2025, 2, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new ReadingList
            {
                Id = 3,
                Name = "Weekend Reads",
                Description = "Shorter books perfect for a weekend",
                CreatedAt = new DateTime(2025, 3, 10, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // ReadingListBooks
        modelBuilder.Entity<ReadingListBook>().HasData(
            // Sci-Fi Essentials
            new ReadingListBook { ReadingListId = 1, BookId = 1, AddedAt = new DateTime(2025, 1, 15, 0, 0, 0, DateTimeKind.Utc), Note = "The granddaddy of modern sci-fi" },
            new ReadingListBook { ReadingListId = 1, BookId = 7, AddedAt = new DateTime(2025, 1, 16, 0, 0, 0, DateTimeKind.Utc), Note = "Dystopian masterpiece" },
            new ReadingListBook { ReadingListId = 1, BookId = 10, AddedAt = new DateTime(2025, 1, 17, 0, 0, 0, DateTimeKind.Utc), Note = "Asimov's magnum opus" },
            // British Classics
            new ReadingListBook { ReadingListId = 2, BookId = 5, AddedAt = new DateTime(2025, 2, 1, 0, 0, 0, DateTimeKind.Utc) },
            new ReadingListBook { ReadingListId = 2, BookId = 3, AddedAt = new DateTime(2025, 2, 2, 0, 0, 0, DateTimeKind.Utc) },
            new ReadingListBook { ReadingListId = 2, BookId = 8, AddedAt = new DateTime(2025, 2, 3, 0, 0, 0, DateTimeKind.Utc) },
            // Weekend Reads
            new ReadingListBook { ReadingListId = 3, BookId = 8, AddedAt = new DateTime(2025, 3, 10, 0, 0, 0, DateTimeKind.Utc), Note = "Short and impactful" },
            new ReadingListBook { ReadingListId = 3, BookId = 2, AddedAt = new DateTime(2025, 3, 11, 0, 0, 0, DateTimeKind.Utc) },
            new ReadingListBook { ReadingListId = 3, BookId = 9, AddedAt = new DateTime(2025, 3, 12, 0, 0, 0, DateTimeKind.Utc) }
        );
    }
}
