using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Business;
using ReactApp2.Server.Infrastructure;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Controllers
{
    /// <summary>
    /// API controller for managing checklists, including creation, retrieval, updating, and archiving operations for
    /// the authenticated user's team or group.
    /// </summary>
    /// <remarks>
    /// All endpoints require authentication and operate on checklists accessible to the current
    /// user. Deleted checklists are archived and scheduled for permanent deletion after 30 days unless restored.
    /// WorkItems associated with checklists are not deleted when a checklist is archived or removed.
    /// 
    /// IActionResult is used for flexibility in returning various HTTP status codes and responses
    /// over directly returning Checklist objects, which may limit response options.
    /// </remarks>
    [ApiController]
    [Route("api/[controller]")]
    public class ChecklistController : ControllerBase
    {
        private readonly IChecklistService _service;
        public ChecklistController(IChecklistService service) => _service = service;

        // Get /checklist
        // Get all checklists for a user group/team (user id from auth token)
        // Active checklists only (not deleted)
        [HttpGet(Name = "GetChecklists")]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllActiveAsync());

        // Get /checklist/{id}
        // Get a checklist by id
        // Populate checklist with tasks with a basic join
        // Validate checklist is allowed by the user
        [HttpGet("{id}", Name = "GetChecklist")]
        public async Task<IActionResult> GetOne(int id) => Ok(await _service.GetOneAsync(id));

        // Post /checklist
        // Create new checklist, return new checklist with id
        // Validate checklist is allowed by the user
        // Checklist in body, id ignored
        [HttpPost(Name = "CreateChecklist")]
        public async Task<IActionResult> CreateOne(CreateChecklist dto) => Ok(await _service.CreateOneAsync(dto));

        // Update / checklist/{id}
        // Update checklist, return updated checklist
        // Validate checklist is allowed by the user
        // Checklist in body, id in url, id in body ignored
        // Updating a checklist should not update the tasks, just the association
        // Tasks can be associated with multiple checklists
        [HttpPut("{id}", Name = "UpdateChecklist")]
        public async Task<IActionResult> UpdateOne(int id, Checklist dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("ID in URL does not match ID in body");
            }
            return Ok(await _service.UpdateOneAsync(dto));
        }

        // Delete / checklist/{id} -> archive, delete in 30 days if not restored
        // Archive checklist, return success/failure
        // Validate checklist is allowed by the user
        // id in url
        // Checklist in body, id in body ignored
        // Deleting a checklist should not delete the tasks, just the association
        // Tasks can be associated with multiple checklists
        [HttpDelete("{id}", Name = "DeleteChecklist")]
        public async Task<IActionResult> DeleteOne(int id)
        {
            var success = await _service.SoftDeleteOneAsync(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
