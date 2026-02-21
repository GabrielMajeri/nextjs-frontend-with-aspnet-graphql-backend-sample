namespace BookStore.Api.Models;

public class ReadingList
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public ICollection<ReadingListBook> ReadingListBooks { get; set; } = [];
}
