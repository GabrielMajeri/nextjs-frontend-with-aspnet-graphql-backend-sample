using BookStore.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookStore.Api.Tests;

public class BookStoreApiFactory : WebApplicationFactory<Program>, IDisposable
{
    private readonly SqliteConnection _connection;

    public BookStoreApiFactory()
    {
        _connection = new SqliteConnection("Data Source=:memory:");
        _connection.Open();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureServices(services =>
        {
            var dbOptionsDescriptor = services
                .SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));

            if (dbOptionsDescriptor is not null)
            {
                services.Remove(dbOptionsDescriptor);
            }

            var dbContextDescriptor = services
                .SingleOrDefault(d => d.ServiceType == typeof(AppDbContext));

            if (dbContextDescriptor is not null)
            {
                services.Remove(dbContextDescriptor);
            }

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(_connection));

            using var scope = services.BuildServiceProvider().CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
        });
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _connection.Dispose();
        }

        base.Dispose(disposing);
    }
}
