# Installation

## EF Core, SQLite, and Tools

Setting up the SQLite for the first time may not work on Start when using the Program.cs code:
```csharp
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
```
So, to set up the database, you need to use the EF Core tools to create the initial migration and update the database.

In Terminal or NuGet Package Manager Console, run the following commands:
```bash
cd ReactApp2.Server
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Add Testing
```bash
dotnet add package xunit
dotnet add package xunit.runner.visualstudio
dotnet add package Moq
dotnet add package FluentAssertions
```