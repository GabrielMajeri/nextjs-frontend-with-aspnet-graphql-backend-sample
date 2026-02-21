using BookStore.Api.Models;

namespace BookStore.Api.GraphQL.Types;

public class AuthorType : ObjectType<Author>
{
    protected override void Configure(IObjectTypeDescriptor<Author> descriptor)
    {
        descriptor.Description("Represents an author of one or more books.");

        descriptor.Field(a => a.Id).Description("The unique identifier.");
        descriptor.Field(a => a.FirstName).Description("Author's first name.");
        descriptor.Field(a => a.LastName).Description("Author's last name.");
    }
}
