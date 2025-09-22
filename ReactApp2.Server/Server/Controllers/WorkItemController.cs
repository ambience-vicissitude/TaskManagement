using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Data;
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
        //
        // Remarks:
        // The empty case for items is [], to simplify for a small app
        // less error-handling, we will go with Ok([]) as acceptable.
        // moreover, checklist agnostic or not, it should not be an error if no work items are found
        [HttpGet(Name = "GetWorkItems")]
        public async Task<IActionResult> GetAll([FromQuery] int? checklistId) => Ok(await _service.GetAllActiveAsync(checklistId));

        // Get /workitem/{id}
        // Get a workitem by id
        // Populate work item with tasks with a basic join
        // Validate work item is allowed by the user
        //
        // Remarks:
        // Contrary to 'GetAll' or 'Get 2+', not finding a specific checklist
        // warrants a NotFound() reponse
        [HttpGet("{id}", Name = "GetWorkItem")]
        public async Task<IActionResult> GetOne(int id)
        {
            var item = await _service.GetOneAsync(id);
            if (item == null) return NotFound();
            return Ok();
        }

        // Post /workitem
        // Create new work item, return new workitem with id
        // Validate work item is allowed by the user
        // WorkItem in body, id ignored
        [HttpPost(Name = "CreateWorkItem")]
        public async Task<IActionResult> CreateOne(CreateWorkItem dto) => Ok(await _service.CreateOneAsync(dto));

        // Update / workitem/{id}
        // Update workitem as complete or incomplete, return updated workitem
        // - accepts from query the 'isComplete' boolean
        // - it is unlikely this call will need many more fields if expanded
        [HttpPatch("{id}", Name = "MarkWorkItemAsCompleteOrIncomplete")]
        public async Task<IActionResult> PatchWorkItemCompletion(int id, [FromQuery] bool isComplete)
        {
            var item = await _service.MarkAsCompleteOrIncomplete(id, isComplete);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // Update / workitem/{id}
        // Update work item, return updated work item
        // Validate work item is allowed by the user
        // WorkItem in body, id in url, id in body ignored
        // Updating a work item should not update the tasks, just the association
        // Tasks can be associated with multiple work items
        [HttpPut("{id}", Name = "UpdateWorkItem")]
        public async Task<IActionResult> UpdateOne(int id, WorkItem dto)
        {
            if (id != dto.Id) return BadRequest("ID in URL does not match ID in body");
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
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
