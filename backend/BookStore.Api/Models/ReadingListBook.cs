namespace BookStore.Api.Models;

/// <summary>
/// Join entity for the many-to-many relationship between ReadingList and Book.
/// </summary>
public class ReadingListBook
{
    public int ReadingListId { get; set; }
    public int BookId { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;

    /// <summary>Optional user note for the book in this list.</summary>
    public string? Note { get; set; }

    // Navigation
    public ReadingList ReadingList { get; set; } = null!;
    public Book Book { get; set; } = null!;
}
