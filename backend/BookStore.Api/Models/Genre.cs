namespace BookStore.Api.Models;

public class Genre
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }

    // Navigation
    public ICollection<Book> Books { get; set; } = [];
}
