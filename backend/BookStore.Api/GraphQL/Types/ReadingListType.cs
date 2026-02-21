using BookStore.Api.Models;

namespace BookStore.Api.GraphQL.Types;

public class ReadingListType : ObjectType<ReadingList>
{
    protected override void Configure(IObjectTypeDescriptor<ReadingList> descriptor)
    {
        descriptor.Description("A curated reading list containing multiple books.");

        descriptor.Field(rl => rl.ReadingListBooks).Ignore();

        descriptor
            .Field("books")
            .Description("Books in this reading list.")
            .Resolve(ctx =>
            {
                var parent = ctx.Parent<ReadingList>();
                return parent.ReadingListBooks.Select(rlb => rlb.Book).ToList();
            });
    }
}
