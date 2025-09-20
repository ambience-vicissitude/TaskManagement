using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Infrastructure
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Checklist>()
                .HasQueryFilter(t => !t.IsDeleted);  // automatically exclude soft-deletes
            modelBuilder.Entity<WorkItem>()
                .HasQueryFilter(t => !t.IsDeleted);  // automatically exclude soft-deletes
        }

        public DbSet<Checklist> Checklists { get; set; }
        public DbSet<WorkItem> WorkItems { get; set; } // Use alias to avoid ambiguity
    }
}
