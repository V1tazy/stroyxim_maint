using Microsoft.EntityFrameworkCore;
using StroyXimTorg.Server.DataBase.Entities;

namespace StroyXimTorg.Server.DataBase
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> dbContext) : base(dbContext)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductEntity>().HasData(new List<ProductEntity>()
            {
                new ProductEntity()
                {
                    
                }
            });
        }

        public DbSet<ProductEntity> ProductEntities { get; set; }
    }
}
