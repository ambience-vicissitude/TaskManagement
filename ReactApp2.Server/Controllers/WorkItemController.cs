using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Business;
using ReactApp2.Server.Infrastructure;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Controllers
{
    /// <summary>
    /// API controller for managing work items, including creation, retrieval, updating, and archiving operations for
    /// the authenticated user's team or group.
    /// </summary>
    /// <remarks>
    /// All endpoints require authentication and operate on work items accessible to the current
    /// user. Deleted work items are archived and scheduled for permanent deletion after 30 days unless restored.
    /// WorkItems associated with work items are not deleted when a workitem is archived or removed.
    /// 
    /// IActionResult is used for flexibility in returning various HTTP status codes and responses
    /// over directly returning WorkItem objects, which may limit response options.
    /// </remarks>
    [ApiController]
    [Route("api/[controller]")]
    public class WorkItemController : ControllerBase
    {
        private readonly IWorkItemService _service;
        public WorkItemController(IWorkItemService service) => _service = service;

        // Get /workitem
        // Get all work items for a user group/team (user id from auth token)
        // Active work items only (not deleted)
        [HttpGet(Name = "GetWorkItems")]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllActiveAsync());

        // Get /workitem/{id}
        // Get a workitem by id
        // Populate work item with tasks with a basic join
        // Validate work item is allowed by the user
        [HttpGet("{id}", Name = "GetWorkItem")]
        public async Task<IActionResult> GetOne(int id) => Ok(await _service.GetOneAsync(id));

        // Post /workitem
        // Create new work item, return new workitem with id
        // Validate work item is allowed by the user
        // WorkItem in body, id ignored
        [HttpPost(Name = "CreateWorkItem")]
        public async Task<IActionResult> CreateOne(CreateWorkItem dto) => Ok(await _service.CreateOneAsync(dto));

        // Update / workitem/{id}
        // Update work item, return updated work item
        // Validate work item is allowed by the user
        // WorkItem in body, id in url, id in body ignored
        // Updating a work item should not update the tasks, just the association
        // Tasks can be associated with multiple work items
        [HttpPut("{id}", Name = "UpdateWorkItem")]
        public async Task<IActionResult> UpdateOne(int id, WorkItem dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("ID in URL does not match ID in body");
            }
            return Ok(await _service.UpdateOneAsync(dto));
        }

        // Delete / workitem/{id} -> archive, delete in 30 days if not restored
        // Archive workitem, return success/failure
        // Validate workitem is allowed by the user
        // id in url
        // WorkItem in body, id in body ignored
        // Deleting a workitem should not delete the tasks, just the association
        // Tasks can be associated with multiple workitems
        [HttpDelete("{id}", Name = "DeleteWorkItem")]
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
