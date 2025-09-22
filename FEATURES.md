# Feature Checklist

This is my developer's 'backlog' board, which doubles as a documentation of the features completed for this demo.

## Checklist

[x] - C
[x] - R
[x] - mark completed
[ ] - U
[x] - D

[ ] - on load, on error separation

## WorkItem

[x] - C
[x] - R
[x] - mark completed
[ ] - U
[x] - D

[ ] - on load, on error separation

## Testing HelloWorld

[ ] - checklist.test.ts
[ ] - workitem.test.ts
[ ] - basic test for checklist controller
[ ] - basic test for checklist dbcontext
[ ] - basic test for workitem controller
[ ] - basic test for workitem dbcontext

## Production Features

### Build it

[x] - non-optimistic update approach, we've taken the non-optimistic route for updates, we assume the checklist or workitems can be outdated after each state change, assuming concurrent users or sessions can modify the same lists

[x] - refresh list button (this helps users quickly sync with the latest updates on the checklist(s) or workitem(s) they are currently viewing)
    - this curate the UX to manage best with the non-optimistic updating strategy we've chosen
    - we went with a polling strategy for auto-refresh to keep lists more up-to-date without compromising UX too much, this strategy is better for smaller apps without real-time push notifications, which would require something like SignalR / WebSockets / SSE

[ ] - soft-delete
    - will the cleanup service work?
[ ] - notable indices added
[ ] - basic CSS to pretty it up
[ ] - lint

### Talk about it

[ ] - OAuth2 User Authentication (write some good notes, but we're skipping this)
[ ] - clean up your docstrings
[ ] - error handling and request case handling, why go with default IActionResult OK() NotFound(), how to customize in the future
[ ] - sorting, filtering, viewing 'history'
[ ] - feature that counts your achieved tasks in one day 'positive feedback for users'
[ ] - 422 unprocessable entity is a 'request' validation readily used in FastAPI Python that helps validate models via data annotations. This I am aware is available in .NET Core EF via DTOs, and I did not fully implement this feature.
[ ] - EF Core has many service configurations that are possible in Program.cs that are imperative and declarative in nature. I also did not fully utilize its abilities, but am aware many more useful features can be turned on via `builder.Services.Add...();` or `app.Use...();`

## Tradeoffs/Assumptions

[ ] - testing library choice, skipping test coverage runners, why skip simulated frontend tests
[ ] - vite/.net EF/react (not preact or redux)
[ ] - tanstack choice
[ ] - folder structure choices
[ ] - long term stability and scalability, CAP theorem
[ ] - speak about extending this to user/group permissions
[ ] - why did we choose the non-optimistic update strategy for react query and REST api
[ ] - how do we scale while avoiding pitfalls of N+1 or racing (a user writes to something that no longer existed at that moment because a moment before another user had deleted it)
[ ] - why the project folder filenames are all 'reactapp' starter code boilerplate, why the project is one monorepo and how to split that later
[ ] - why i didnt use axios (and other good addons)
[ ] - the purpose of the soft-delete is _we don't wanna lose history/audit of previous tasks, so even though they are 'removed' from the frontend's POV, they can later be moved via a db trigger of sorts to a records table_. one can also imagine auto-soft-delete for completed work items or checklists as a user setting or app feature.

## Media

[ ] - record a demo video
[ ] - update github link
[ ] - double check assignment notes are all covered:
    - Backend API design. Please use .NET Core.
    - Data structure design. Please use SQL Lite or EF Core in memory.
    - Frontend component design. Please use React or Vue.
    - Communication between frontend and backend.
    - Clean code, architecture structure, and thought process.
    - Trade-offs and assumptions.
    - Include a short README.md with setup steps and your explanation notes.
    - Comments or a README.md explaining assumptions, scalability, and what you would implement in the future.
[ ] - delete clutter to avoid confusing evaluators with files that do not currently serve purpose
[ ] - notify hiring team
