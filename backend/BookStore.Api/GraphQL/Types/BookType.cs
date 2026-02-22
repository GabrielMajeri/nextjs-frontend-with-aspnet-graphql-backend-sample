using BookStore.Api.Models;

namespace BookStore.Api.GraphQL.Types;

public class BookType : ObjectType<Book>
{
    protected override void Configure(IObjectTypeDescriptor<Book> descriptor)
    {
        descriptor.Description("Represents a book in the bookstore.");

        descriptor.Field(b => b.Id).Description("The unique identifier of the book.");
        descriptor.Field(b => b.Title).Description("The title of the book.");
        descriptor.Field(b => b.Isbn).Description("The ISBN of the book.");
        descriptor.Field(b => b.Rating).Description("Average reader rating (between 0.00 and 5.00 inclusive).");

        descriptor.Field(b => b.AuthorId).Ignore();
        descriptor.Field(b => b.GenreId).Ignore();
        descriptor.Field(b => b.ReadingListBooks).Ignore();
    }
}
