using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Infrastructure;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Business
{
    public interface IWorkItemService
    {
        Task<IEnumerable<WorkItem>> GetAllActiveAsync(int? checklistId);
        Task<WorkItem?> GetOneAsync(int id);
        Task<WorkItem?> UpdateOneAsync(WorkItem dto);
        Task<WorkItem> CreateOneAsync(CreateWorkItem dto);
        Task<bool> SoftDeleteOneAsync(int id);
    }

    public class WorkItemService: IWorkItemService
    {
        private readonly AppDbContext _context;
        public WorkItemService(AppDbContext context) => _context = context;

        // Get all active (not soft-deleted) work items, option for a where clause for a specific checklist
        public async Task<IEnumerable<WorkItem>> GetAllActiveAsync(int? checklistId)
        {
            IQueryable<WorkItem> query = _context.WorkItems;

            if (checklistId.HasValue)
            {
                query = query.Where(w => w.ChecklistId == checklistId.Value);
            }

            return await query.ToListAsync(); // async query execution
        }

        public async Task<WorkItem?> GetOneAsync(int id) => await _context.WorkItems.FindAsync(id); // primary key lookup

        public async Task<WorkItem?> UpdateOneAsync(WorkItem dto)
        {
            var item = await _context.WorkItems.FindAsync(dto.Id);
            if (item == null) return null;
            item.Name = dto.Name;
            item.Description = dto.Description;
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<WorkItem> CreateOneAsync(CreateWorkItem dto)
        {
            var item = new WorkItem
            {
                Name = dto.Name,
                Description = dto.Description,
                ChecklistId = dto.ChecklistId
            };

            _context.WorkItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> SoftDeleteOneAsync(int id)
        {
            var item = await _context.WorkItems.FindAsync(id);
            if (item == null) return false;

            item.IsDeleted = true;
            item.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
