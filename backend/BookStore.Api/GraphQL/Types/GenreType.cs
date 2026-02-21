using BookStore.Api.Models;

namespace BookStore.Api.GraphQL.Types;

public class GenreType : ObjectType<Genre>
{
    protected override void Configure(IObjectTypeDescriptor<Genre> descriptor)
    {
        descriptor.Description("A literary genre used to categorize books.");
    }
}
