using BookStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Author> Authors => Set<Author>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<ReadingList> ReadingLists => Set<ReadingList>();
    public DbSet<ReadingListBook> ReadingListBooks => Set<ReadingListBook>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Book
        modelBuilder.Entity<Book>(b =>
        {
            b.HasIndex(x => x.Isbn).IsUnique();
            b.Property(x => x.Rating).HasPrecision(3, 2);
            b.HasOne(x => x.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(x => x.AuthorId);
            b.HasOne(x => x.Genre)
                .WithMany(g => g.Books)
                .HasForeignKey(x => x.GenreId);
        });

        // ReadingListBook (join table)
        modelBuilder.Entity<ReadingListBook>(rlb =>
        {
            rlb.HasKey(x => new { x.ReadingListId, x.BookId });
            rlb.HasOne(x => x.ReadingList)
                .WithMany(rl => rl.ReadingListBooks)
                .HasForeignKey(x => x.ReadingListId);
            rlb.HasOne(x => x.Book)
                .WithMany(bk => bk.ReadingListBooks)
                .HasForeignKey(x => x.BookId);
        });

        // Seed data
        SeedData.Seed(modelBuilder);
    }
}
