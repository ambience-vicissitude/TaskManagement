using System;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Contexts;
using ReactApp2.Server.Data;
using ReactApp2.Server.Models;
using Xunit;

namespace ReactApp2.Tests.Data
{
    public class ChecklistServiceTests
    {
        private async Task<AppDbContext> GetInMemoryDbContextAsync()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var context = new AppDbContext(options);

            // Seed with sample data
            context.Checklists.AddRange(
                new Checklist { Id = 1, Name = "Checklist 1", Description = "Desc 1", IsComplete = false },
                new Checklist { Id = 2, Name = "Checklist 2", Description = "Desc 2", IsComplete = true }
            );
            await context.SaveChangesAsync();

            return context;
        }

        [Fact]
        public async Task GetAllActiveAsync_ReturnsAllItems()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var result = await service.GetAllActiveAsync();

            result.Should().HaveCount(2);
        }

        [Fact]
        public async Task GetOneAsync_ReturnsItem_WhenExists()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var item = await service.GetOneAsync(1);

            item.Should().NotBeNull();
            item!.Name.Should().Be("Checklist 1");
        }

        [Fact]
        public async Task GetOneAsync_ReturnsNull_WhenNotExists()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var item = await service.GetOneAsync(999);

            item.Should().BeNull();
        }

        [Fact]
        public async Task MarkAsCompleteOrIncomplete_UpdatesItem()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var updated = await service.MarkAsCompleteOrIncomplete(1, true);

            updated.Should().NotBeNull();
            updated!.IsComplete.Should().BeTrue();

            // Verify persisted
            var fromDb = await context.Checklists.FindAsync(1);
            fromDb!.IsComplete.Should().BeTrue();
        }

        [Fact]
        public async Task MarkAsCompleteOrIncomplete_ReturnsNull_WhenNotFound()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var updated = await service.MarkAsCompleteOrIncomplete(999, true);

            updated.Should().BeNull();
        }

        [Fact]
        public async Task UpdateOneAsync_UpdatesExistingItem()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var dto = new Checklist { Id = 1, Name = "Updated Name", Description = "Updated Desc" };
            var updated = await service.UpdateOneAsync(dto);

            updated.Should().NotBeNull();
            updated!.Name.Should().Be("Updated Name");
            updated.Description.Should().Be("Updated Desc");
        }

        [Fact]
        public async Task CreateOneAsync_AddsNewItem()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var dto = new CreateChecklist { Name = "New Checklist", Description = "New Desc" };
            var created = await service.CreateOneAsync(dto);

            created.Should().NotBeNull();
            created.Id.Should().BeGreaterThan(0);
            created.Name.Should().Be("New Checklist");

            (await context.Checklists.CountAsync()).Should().Be(3);
        }

        [Fact]
        public async Task SoftDeleteOneAsync_SetsIsDeletedAndDeletedAt()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var success = await service.SoftDeleteOneAsync(1);

            success.Should().BeTrue();
            var item = await context.Checklists.FindAsync(1);
            item!.IsDeleted.Should().BeTrue();
            item.DeletedAt.Should().NotBeNull();
        }

        [Fact]
        public async Task SoftDeleteOneAsync_ReturnsFalse_WhenNotFound()
        {
            using var context = await GetInMemoryDbContextAsync();
            var service = new ChecklistService(context);

            var result = await service.SoftDeleteOneAsync(999);

            result.Should().BeFalse();
        }
    }
}
