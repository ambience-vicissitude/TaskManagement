using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Business;
using ReactApp2.Server.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


// Add DbContext with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Service that supports soft-delete, periodic cleanup of soft-deleted items
// it is not a reliable long term solution, but for sqllite demo purposes it is sufficient
//builder.Services.AddHostedService<WorkItemCleanupService>();
//builder.Services.AddHostedService<WorkItemCleanupService>();

// Add Data Services
builder.Services.AddScoped<IWorkItemService, WorkItemService>();
builder.Services.AddScoped<IChecklistService, ChecklistService>();


var app = builder.Build();


// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    //db.Database.EnsureCreated();
    db.Database.Migrate(); // applies migrations; creates DB if it doesn't exist

    // Optional: Seed initial data
    //if (!db.WorkItems.Any())
    //{
    //    db.WorkItems.AddRange(new[]
    //    {
    //        new WorkItem { Name = "Initial Todo 1" },
    //        new WorkItem { Name = "Initial Todo 2" }
    //    });

    //    db.SaveChanges();
    //}
}

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//app.MapFallbackToFile("/index.html");

app.Run();
