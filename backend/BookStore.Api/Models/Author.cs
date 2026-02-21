namespace BookStore.Api.Models;

public class Author
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Biography { get; set; }
    public DateOnly? BirthDate { get; set; }
    public string? PhotoUrl { get; set; }

    // Navigation
    public ICollection<Book> Books { get; set; } = [];
}
