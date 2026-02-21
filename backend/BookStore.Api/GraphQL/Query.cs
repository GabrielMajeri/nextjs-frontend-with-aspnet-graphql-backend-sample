using BookStore.Api.Data;
using BookStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.GraphQL;

public class Query
{
    /// <summary>Get all books with optional filtering, sorting and pagination.</summary>
    [UseFiltering]
    [UseSorting]
    public IQueryable<Book> GetBooks(AppDbContext context)
        => context.Books
            .Include(b => b.Author)
            .Include(b => b.Genre);

    /// <summary>Get a single book by its ID.</summary>
    public async Task<Book?> GetBookById(AppDbContext context, int id)
        => await context.Books
            .Include(b => b.Author)
            .Include(b => b.Genre)
            .FirstOrDefaultAsync(b => b.Id == id);

    /// <summary>Get all authors.</summary>
    [UseFiltering]
    [UseSorting]
    public IQueryable<Author> GetAuthors(AppDbContext context)
        => context.Authors.Include(a => a.Books).ThenInclude(b => b.Genre);

    /// <summary>Get a single author by their ID.</summary>
    public async Task<Author?> GetAuthorById(AppDbContext context, int id)
        => await context.Authors
            .Include(a => a.Books).ThenInclude(b => b.Genre)
            .FirstOrDefaultAsync(a => a.Id == id);

    /// <summary>Get all genres.</summary>
    public IQueryable<Genre> GetGenres(AppDbContext context)
        => context.Genres;

    /// <summary>Get all reading lists.</summary>
    [UseFiltering]
    [UseSorting]
    public IQueryable<ReadingList> GetReadingLists(AppDbContext context)
        => context.ReadingLists
            .Include(rl => rl.ReadingListBooks)
            .ThenInclude(rlb => rlb.Book)
            .ThenInclude(b => b.Author);

    /// <summary>Get a single reading list by its ID.</summary>
    public async Task<ReadingList?> GetReadingListById(AppDbContext context, int id)
        => await context.ReadingLists
            .Include(rl => rl.ReadingListBooks)
            .ThenInclude(rlb => rlb.Book)
            .ThenInclude(b => b.Author)
            .FirstOrDefaultAsync(rl => rl.Id == id);
}
