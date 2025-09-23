using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ReactApp2.Server.Controllers;
using ReactApp2.Server.Data;
using ReactApp2.Server.Models;
using Xunit;

namespace ReactApp2.Tests
{
    public class ChecklistControllerTests
    {
        private readonly Mock<IChecklistService> _mockService;
        private readonly ChecklistController _controller;

        public ChecklistControllerTests()
        {
            _mockService = new Mock<IChecklistService>();
            _controller = new ChecklistController(_mockService.Object);
        }

        [Fact]
        public async Task GetAll_ReturnsOkWithChecklists()
        {
            var mockChecklists = new List<Checklist> { new() { Id = 1, Name = "Test" } };
            _mockService.Setup(s => s.GetAllActiveAsync()).ReturnsAsync(mockChecklists);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedChecklists = Assert.IsAssignableFrom<IEnumerable<Checklist>>(okResult.Value);
            Assert.Single(returnedChecklists);
        }

        [Fact]
        public async Task GetOne_ReturnsOk_WhenChecklistExists()
        {
            var checklist = new Checklist { Id = 1, Name = "Test" };
            _mockService.Setup(s => s.GetOneAsync(1)).ReturnsAsync(checklist);

            var result = await _controller.GetOne(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedChecklist = Assert.IsType<Checklist>(okResult.Value);
            Assert.Equal(1, returnedChecklist.Id);
        }

        [Fact]
        public async Task GetOne_ReturnsNotFound_WhenChecklistDoesNotExist()
        {
            _mockService.Setup(s => s.GetOneAsync(999)).ReturnsAsync((Checklist?)null);

            var result = await _controller.GetOne(999);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task CreateOne_ReturnsOkWithCreatedChecklist()
        {
            var dto = new CreateChecklist { Name = "New Checklist" };
            var created = new Checklist { Id = 1, Name = "New Checklist" };
            _mockService.Setup(s => s.CreateOneAsync(dto)).ReturnsAsync(created);

            var result = await _controller.CreateOne(dto);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedChecklist = Assert.IsType<Checklist>(okResult.Value);
            Assert.Equal(1, returnedChecklist.Id);
        }

        [Fact]
        public async Task PatchChecklistCompletion_ReturnsOk_WhenSuccessful()
        {
            var updated = new Checklist { Id = 1, Name = "Test", IsComplete = true };
            _mockService.Setup(s => s.MarkAsCompleteOrIncomplete(1, true)).ReturnsAsync(updated);

            var result = await _controller.PatchChecklistCompletion(1, true);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedChecklist = Assert.IsType<Checklist>(okResult.Value);
            Assert.True(returnedChecklist.IsComplete);
        }

        [Fact]
        public async Task PatchChecklistCompletion_ReturnsNotFound_WhenServiceReturnsNull()
        {
            _mockService.Setup(s => s.MarkAsCompleteOrIncomplete(1, true)).ReturnsAsync((Checklist?)null);

            var result = await _controller.PatchChecklistCompletion(1, true);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateOne_ReturnsBadRequest_WhenIdMismatch()
        {
            var dto = new Checklist { Id = 2, Name = "Test" };

            var result = await _controller.UpdateOne(1, dto);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("ID in URL does not match ID in body", badRequest.Value);
        }

        [Fact]
        public async Task UpdateOne_ReturnsOk_WhenSuccessful()
        {
            var dto = new Checklist { Id = 1, Name = "Updated" };
            _mockService.Setup(s => s.UpdateOneAsync(dto)).ReturnsAsync(dto);

            var result = await _controller.UpdateOne(1, dto);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedChecklist = Assert.IsType<Checklist>(okResult.Value);
            Assert.Equal("Updated", returnedChecklist.Name);
        }

        [Fact]
        public async Task DeleteOne_ReturnsNoContent_WhenSuccessful()
        {
            _mockService.Setup(s => s.SoftDeleteOneAsync(1)).ReturnsAsync(true);

            var result = await _controller.DeleteOne(1);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteOne_ReturnsNotFound_WhenFailed()
        {
            _mockService.Setup(s => s.SoftDeleteOneAsync(1)).ReturnsAsync(false);

            var result = await _controller.DeleteOne(1);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
