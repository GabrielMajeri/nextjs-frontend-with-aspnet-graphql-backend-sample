using System.Net.Http.Json;
using System.Text.Json;

namespace BookStore.Api.Tests;

public class GraphQlIntegrationTests : IClassFixture<BookStoreApiFactory>
{
    private readonly HttpClient _client;

    public GraphQlIntegrationTests(BookStoreApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task BooksQuery_ReturnsSeededBooks()
    {
        var request = new
        {
            query = "query { books { id title } }"
        };

        var response = await _client.PostAsJsonAsync("/graphql", request);

        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<JsonElement>();
        var books = payload
            .GetProperty("data")
            .GetProperty("books")
            .EnumerateArray()
            .ToList();

        Assert.NotEmpty(books);
        Assert.Contains(books, b => b.GetProperty("title").GetString() == "Dune");
    }

    [Fact]
    public async Task AddBookMutation_CreatesBook()
    {
        var request = new
        {
            query = @"
                mutation {
                  addBook(input: {
                    title: ""Test Book""
                    isbn: ""978-1-23456-789-7""
                    pageCount: 123
                    language: ""English""
                    authorId: 1
                    genreId: 2
                  }) {
                    id
                    title
                    isbn
                }
                }"
        };

        var response = await _client.PostAsJsonAsync("/graphql", request);

        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<JsonElement>();
        var created = payload
            .GetProperty("data")
            .GetProperty("addBook");

        Assert.Equal("Test Book", created.GetProperty("title").GetString());
        Assert.Equal("978-1-23456-789-7", created.GetProperty("isbn").GetString());
    }
}
