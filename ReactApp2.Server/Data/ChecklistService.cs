using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Infrastructure;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Business
{

    // Interface for ChecklistService
    //
    // although a generic interface for all crud services can be useful for testing and extensibility, the tradeoff for boilerplate is not always worth it
    public interface IChecklistService
    {
        Task<IEnumerable<Checklist>> GetAllActiveAsync();
        Task<Checklist?> GetOneAsync(int id);
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

        public async Task<Checklist?> UpdateOneAsync(Checklist dto)
        {
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
            if (item == null) return false;

            item.IsDeleted = true;
            item.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
