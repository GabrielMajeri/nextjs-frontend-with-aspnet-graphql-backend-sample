namespace BookStore.Api.Models;

public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string Isbn { get; set; }
    public int PageCount { get; set; }
    public DateOnly? PublishedDate { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? Language { get; set; }
    public decimal? Rating { get; set; }

    // Foreign keys
    public int AuthorId { get; set; }
    public int GenreId { get; set; }

    // Navigation
    public Author Author { get; set; } = null!;
    public Genre Genre { get; set; } = null!;
    public ICollection<ReadingListBook> ReadingListBooks { get; set; } = [];
}
