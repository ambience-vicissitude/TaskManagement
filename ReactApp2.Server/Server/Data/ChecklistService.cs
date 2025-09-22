using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Contexts;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Data
{

    // Interface for ChecklistService
    //
    // although a generic interface for all crud services can be useful for testing and extensibility, the tradeoff for boilerplate is not always worth it
    public interface IChecklistService
    {
        Task<IEnumerable<Checklist>> GetAllActiveAsync();
        Task<Checklist?> GetOneAsync(int id);
        Task<Checklist?> MarkAsCompleteOrIncomplete(int id, bool completed);
        Task<Checklist?> UpdateOneAsync(Checklist dto);
        Task<Checklist> CreateOneAsync(CreateChecklist dto);
        Task<bool> SoftDeleteOneAsync(int id);
    }

    // Checklist class
    public class ChecklistService: IChecklistService
    {
        private readonly AppDbContext _context;
        public ChecklistService(AppDbContext context) => _context = context;
        public async Task<IEnumerable<Checklist>> GetAllActiveAsync() => await _context.Checklists.ToListAsync();
        public async Task<Checklist?> GetOneAsync(int id) => await _context.Checklists.FindAsync(id); // primary key lookup
        public async Task<Checklist?> MarkAsCompleteOrIncomplete(int id, bool isComplete)
        {
            // Query first, then mutate, utilizing EF Core change tracking and not on LINQ select
            var item = await _context.Checklists.FirstOrDefaultAsync(c => c.Id == id);
            if (item == null) return null;
            item.IsComplete = isComplete;
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<Checklist?> UpdateOneAsync(Checklist dto)
        {
            // Query first, then mutate, utilizing EF Core change tracking and not on LINQ select
            var item = await _context.Checklists.FindAsync(dto.Id);
            if (item == null) return null;
            item.Name = dto.Name;
            item.Description = dto.Description;
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<Checklist> CreateOneAsync(CreateChecklist dto)
        {
            var item = new Checklist
            {
                Name = dto.Name,
                Description = dto.Description
            };

            _context.Checklists.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> SoftDeleteOneAsync(int id)
        {
            var item = await _context.Checklists.FindAsync(id);

            // remarks: This is a good case for better error handling/logging, to report an item == null is assuming the item was not found
            // and delegates the responsibility of communicating that back to the controller. this could be extended with custom exceptions or result types.
            // however, for simplicity, we return false here to indicate failure to delete, when we could throw a 'more expensive' exception here
            // and let the controller handle the error instead. Some exceptions can help reveal details while not exposing inner workings that are not meant for the recipient.
            // It depends on the case.
            if (item == null) return false;

            item.IsDeleted = true;
            item.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
