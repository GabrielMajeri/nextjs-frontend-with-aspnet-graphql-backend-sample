using BookStore.Api.Data;
using BookStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.GraphQL;

public class Mutation
{
    public async Task<Book> AddBook(AppDbContext context, AddBookInput input)
    {
        var book = new Book
        {
            Title = input.Title,
            Description = input.Description,
            Isbn = input.Isbn,
            PageCount = input.PageCount,
            PublishedDate = input.PublishedDate,
            CoverImageUrl = input.CoverImageUrl,
            Language = input.Language ?? "English",
            Rating = input.Rating,
            AuthorId = input.AuthorId,
            GenreId = input.GenreId
        };

        context.Books.Add(book);
        await context.SaveChangesAsync();

        return await context.Books
            .Include(b => b.Author)
            .Include(b => b.Genre)
            .FirstAsync(b => b.Id == book.Id);
    }

    public async Task<Book> UpdateBook(AppDbContext context, int id, UpdateBookInput input)
    {
        var book = await context.Books.FindAsync(id)
            ?? throw new GraphQLException($"Book with ID {id} not found.");

        if (input.Title is not null) book.Title = input.Title;
        if (input.Description is not null) book.Description = input.Description;
        if (input.Isbn is not null) book.Isbn = input.Isbn;
        if (input.PageCount.HasValue) book.PageCount = input.PageCount.Value;
        if (input.PublishedDate.HasValue) book.PublishedDate = input.PublishedDate;
        if (input.CoverImageUrl is not null) book.CoverImageUrl = input.CoverImageUrl;
        if (input.Language is not null) book.Language = input.Language;
        if (input.Rating.HasValue) book.Rating = input.Rating;
        if (input.AuthorId.HasValue) book.AuthorId = input.AuthorId.Value;
        if (input.GenreId.HasValue) book.GenreId = input.GenreId.Value;

        await context.SaveChangesAsync();

        return await context.Books
            .Include(b => b.Author)
            .Include(b => b.Genre)
            .FirstAsync(b => b.Id == book.Id);
    }

    public async Task<bool> DeleteBook(AppDbContext context, int id)
    {
        var book = await context.Books.FindAsync(id);
        if (book is null) return false;

        context.Books.Remove(book);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<Author> AddAuthor(AppDbContext context, AddAuthorInput input)
    {
        var author = new Author
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            Biography = input.Biography,
            BirthDate = input.BirthDate,
            PhotoUrl = input.PhotoUrl
        };

        context.Authors.Add(author);
        await context.SaveChangesAsync();
        return author;
    }

    public async Task<Author> UpdateAuthor(AppDbContext context, int id, UpdateAuthorInput input)
    {
        var author = await context.Authors.FindAsync(id)
            ?? throw new GraphQLException($"Author with ID {id} not found.");

        if (input.FirstName is not null) author.FirstName = input.FirstName;
        if (input.LastName is not null) author.LastName = input.LastName;
        if (input.Biography is not null) author.Biography = input.Biography;
        if (input.BirthDate.HasValue) author.BirthDate = input.BirthDate;
        if (input.PhotoUrl is not null) author.PhotoUrl = input.PhotoUrl;

        await context.SaveChangesAsync();
        return author;
    }

    public async Task<bool> DeleteAuthor(AppDbContext context, int id)
    {
        var author = await context.Authors.FindAsync(id);
        if (author is null) return false;

        context.Authors.Remove(author);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<ReadingList> CreateReadingList(AppDbContext context, CreateReadingListInput input)
    {
        var list = new ReadingList
        {
            Name = input.Name,
            Description = input.Description
        };

        context.ReadingLists.Add(list);
        await context.SaveChangesAsync();
        return list;
    }

    public async Task<ReadingList> AddBookToReadingList(
        AppDbContext context, int readingListId, int bookId, string? note)
    {
        var exists = await context.ReadingListBooks
            .AnyAsync(rlb => rlb.ReadingListId == readingListId && rlb.BookId == bookId);
        if (exists)
            throw new GraphQLException("Book is already in this reading list.");

        context.ReadingListBooks.Add(new ReadingListBook
        {
            ReadingListId = readingListId,
            BookId = bookId,
            Note = note
        });
        await context.SaveChangesAsync();

        return await context.ReadingLists
            .Include(rl => rl.ReadingListBooks)
            .ThenInclude(rlb => rlb.Book)
            .ThenInclude(b => b.Author)
            .FirstAsync(rl => rl.Id == readingListId);
    }

    public async Task<ReadingList> RemoveBookFromReadingList(
        AppDbContext context, int readingListId, int bookId)
    {
        var entry = await context.ReadingListBooks
            .FirstOrDefaultAsync(rlb => rlb.ReadingListId == readingListId && rlb.BookId == bookId)
            ?? throw new GraphQLException("Book not found in this reading list.");

        context.ReadingListBooks.Remove(entry);
        await context.SaveChangesAsync();

        return await context.ReadingLists
            .Include(rl => rl.ReadingListBooks)
            .ThenInclude(rlb => rlb.Book)
            .ThenInclude(b => b.Author)
            .FirstAsync(rl => rl.Id == readingListId);
    }

    public async Task<bool> DeleteReadingList(AppDbContext context, int id)
    {
        var list = await context.ReadingLists.FindAsync(id);
        if (list is null) return false;

        context.ReadingLists.Remove(list);
        await context.SaveChangesAsync();
        return true;
    }
}

public record AddBookInput(
    string Title,
    string? Description,
    string Isbn,
    int PageCount,
    DateOnly? PublishedDate,
    string? CoverImageUrl,
    string? Language,
    decimal? Rating,
    int AuthorId,
    int GenreId);

public record UpdateBookInput(
    string? Title,
    string? Description,
    string? Isbn,
    int? PageCount,
    DateOnly? PublishedDate,
    string? CoverImageUrl,
    string? Language,
    decimal? Rating,
    int? AuthorId,
    int? GenreId);

public record AddAuthorInput(
    string FirstName,
    string LastName,
    string? Biography,
    DateOnly? BirthDate,
    string? PhotoUrl);

public record UpdateAuthorInput(
    string? FirstName,
    string? LastName,
    string? Biography,
    DateOnly? BirthDate,
    string? PhotoUrl);

public record CreateReadingListInput(
    string Name,
    string? Description);
