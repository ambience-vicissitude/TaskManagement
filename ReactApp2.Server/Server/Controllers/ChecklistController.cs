using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Data;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Controllers
{
    /// <summary>
    /// API controller for managing checklists, including creation, retrieval, updating, and archiving operations for
    /// the authenticated user's team or group.
    /// </summary>
    /// <remarks>
    /// All endpoints require authentication and operate on checklists accessible to the current
    /// user.
    /// 
    /// Deleted checklists are archived and scheduled for permanent deletion after 30 days unless restored.
    /// WorkItems associated with checklists are not deleted when a checklist is archived or removed.
    /// 
    /// WorkItems associated with checklists are not automatically marked as complete or incomplete when a checklist is marked as such.
    /// A separate operation is required to update the status of individual WorkItems.
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
        //
        // Remarks:
        // The empty case for items is [], to simplify for a small app
        // less error-handling, we will go with Ok([]) as acceptable.
        // moreover, it should not be an error if no checklists are found, a brand new instance of the app
        // or a user-permission based checklist directory would show no checklists and not be an error case
        [HttpGet(Name = "GetChecklists")]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllActiveAsync());

        // Get /checklist/{id}
        // Get a checklist by id
        // Populate checklist with tasks with a basic join
        // Validate checklist is allowed by the user
        //
        // Remarks:
        // Contrary to 'GetAll' or 'Get 2+', not finding a specific checklist
        // warrants a NotFound() reponse
        [HttpGet("{id}", Name = "GetChecklist")]
        public async Task<IActionResult> GetOne(int id)
        {
            var item = await _service.GetOneAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // Post /checklist
        // Create new checklist, return new checklist with id
        // Validate checklist is allowed by the user
        // Checklist in body, id ignored
        [HttpPost(Name = "CreateChecklist")]
        public async Task<IActionResult> CreateOne(CreateChecklist dto) => Ok(await _service.CreateOneAsync(dto));

        // Update / checklist/{id}
        // Update checklist as complete or incomplete, return updated checklist
        // - accepts from query the 'isComplete' boolean
        // - it is unlikely this call will need many more fields if expanded
        [HttpPatch("{id}", Name = "MarkChecklistAsCompleteOrIncomplete")]
        public async Task<IActionResult> PatchChecklistCompletion(int id, [FromQuery] bool isComplete)
        {
            var item = await _service.MarkAsCompleteOrIncomplete(id, isComplete);
            if (item == null) NotFound();
            return Ok(item);
        }

        // Update / checklist/{id}
        // Update checklist, return updated checklist
        // Validate checklist is allowed by the user
        // Checklist in body, id in url, id in body ignored
        // Updating a checklist should not update the tasks, just the association
        // Tasks can be associated with multiple checklists
        [HttpPut("{id}", Name = "UpdateChecklist")]
        public async Task<IActionResult> UpdateOne(int id, Checklist dto)
        {
            if (id != dto.Id) return BadRequest("ID in URL does not match ID in body");
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
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
