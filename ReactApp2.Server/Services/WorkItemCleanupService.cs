using ReactApp2.Server.Infrastructure;

namespace ReactApp2.Server.Services
{
    public class WorkItemCleanupService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        public WorkItemCleanupService(IServiceScopeFactory scopeFactory) => _scopeFactory = scopeFactory;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var threshold = DateTime.UtcNow.AddDays(-30);
                var oldDeleted = context.WorkItems
                    .Where(t => t.IsDeleted && t.DeletedAt <= threshold);

                context.WorkItems.RemoveRange(oldDeleted);
                await context.SaveChangesAsync();

                await Task.Delay(TimeSpan.FromHours(24), stoppingToken); // run daily
            }
        }
    }
}
