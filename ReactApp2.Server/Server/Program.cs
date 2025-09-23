using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Contexts;
using ReactApp2.Server.Data;
using ReactApp2.Server.Services;

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
builder.Services.AddHostedService<ChecklistCleanupService>();
builder.Services.AddHostedService<WorkItemCleanupService>();

// Add Data Services
builder.Services.AddScoped<IWorkItemService, WorkItemService>();
builder.Services.AddScoped<IChecklistService, ChecklistService>();

var app = builder.Build();

// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    //db.Database.EnsureCreated(); // initial creation, not needed after first commit
    db.Database.Migrate(); // applies migrations; creates DB if it doesn't exist
}

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// OAuth2 is a must for any production product, but out of scope for this demo
//app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// TODO: I would look into if this serves well/poorly as the `Catch-all to serve index.html for SPA routes`
app.MapFallbackToFile("/index.html");

app.Run();
