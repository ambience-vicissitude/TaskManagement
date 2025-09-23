# Feature Checklist

This is my developer's 'backlog' board, which doubles as a documentation of the features completed for this demo. I also give overview on tradeoffs here that I had not already mentioned in the README.md or in code.

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

[x] - workitem feature unit testing
[ ] - checklist feature unit testing
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

[x] - soft-delete
[x] - cleanup service for .net
    - went with a .net service for now to manage completed work items and checklists
    - the same concept can be applied if work items and checklists become time-sensitive (archived, expired, due date reached, not yet started, etc.)
[x] - notable indices added
[x] - basic CSS to pretty it up
[ ] - lint
[ ] - feature that counts your achieved tasks in one day 'positive feedback for users'
[x] - clean up your docstrings

## Tradeoffs/Assumptions

Why did I skip testing?

- In any business or real-life scenario, testing is the verification needed to confirm code is ready and shippable. However, testing is the bottom half of the iceberg, and I wanted to show results within the _one week timeframe_ I had. Also I was working with technologies I was not actively using in my day job's current tech stack (Python FastAPI, Javascript without TS, Open Web Components), I needed to focus on reapplying my full stack skills on different tools to do the same thing (.NET Core EF, Typescript, React). I believe what I've written shows I can ramp up very quickly, like playing the same sport but as the Away team in a different environment. However, it never felt right to skip thorough coverage testing, I preferred to have done them.
- update: I did add workItem feature testing on the frontend and checklist feature testing on the backend, the conceptual intent here is to show my knowledge, but also noting that better coverage should be done in a production-ready scenario.

Why did I choose the testing libraries that I did?

- In honesty, I didn't take time to go over its tradeoffs, I only ensured I picked a testing approach that was commonly used and has good support.

How did I decide on structure of my folders?

- client was separated into app & features so that features are independent of the routing and also components that are reusable in other places.
- server was separated into data service and api controller layers, could be further separated into api, business, and data layers but was sufficient for small app solution

Why did I chose Tanstack?

- I went to tanstack due to popularity, its latest features that resolve react-redux, react-router, and react-query related problems with elegance and support
- in an ideal timeline, it is important to reconsider whether to overload a frontend with too many npm packages, particularly if the company does not own them all even if open-source

How come I chose to use Fetch directly instead of Axios?

- I chose Fetch due to its built-in nature and my own familiarity. Axios wraps the fetch for some better handling of edge and error cases, as well as loading the result body in less lines of code. However, for my use case Fetch is sufficient.

Could I speak about extending this to user/group permissions?

- The assumption there will soon be unique users or user-groups is baked into this code
- Checklists and Work Items could be interacted by multiple persons at the same time or at any time, shareable
- sharing something does not necessitate sharing with only those within a group
- A users and permission structure must be decided based on domain/business logic, something I won't invent for now.

Why did we choose the non-optimistic update strategy for react query and REST api?

- I made mention of this API code comments and docstrings, the general reason was easier support of multiple user sessions interacting with the frontend and API. This means it is not really a good idea to be optimistic. A local session is unlikely to have the latest update after a user made an edit.

How do we scale while avoiding pitfalls of N+1 or racing (a user writes to something that no longer existed at that moment because a moment before another user had deleted it)?

- I made note of where N+1 can happen in the API code comments and docstrings, however the typical well-known scenario is looping a join query.

Why the project folder filenames are all 'reactapp' starter code boilerplate, why the project is one monorepo and how to split that later?
    
- the monorepo made the project submission easier, leaned on what VS Studio gathered out of the box, and is small enough that there no current needs to separate to smaller repos
- I ran out of time to rename the 'ReactApp2' name to a proper domain name

Why was the soft-delete considered useful?

- the purpose of the soft-delete is _we don't wanna lose history/audit of previous tasks, so even though they are 'removed' from the frontend's POV, they can later be moved via a db trigger of sorts to a records table_. one can also imagine auto-soft-delete for completed work items or checklists as a user setting or app feature.
- soft-delete has a 'cleanup service', this feature could be reimplemented for certain features like 'archive work items', 'remove completed items', 'after items expire, should they go away', this is all towards two goals, (1): support archiving and keeping a record of done work, (2): keeping UI clean and preventing too many data both in transit (per request) and in total volume (database sizes).

What if two users simultaneously edit something and submit contrary requests, would this create a race condition?

- this is _not_ baked into this code. here are some options:
    - PREFERRED CHOICE: optimistic concurrency control (with a rowversion/timestamp)
        - a client sends last known version with its update, the DB checks the version, if this submission would ruin the latest update a 409 conflict should be sent to reject a client
        - this would be my current recommendation for small app, low edit frequency
    - pessimistic concurrency control, last write wins, CRDTs, operational transforms are possible alternatives

## Media

[ ] - record a demo video
[x] - update github link
[x] - double check assignment notes are all covered:
    [x] - Backend API design. Please use .NET Core.
    [x] - Data structure design. Please use SQL Lite or EF Core in memory.
    [x] - Frontend component design. Please use React or Vue.
    [x] - Communication between frontend and backend.
    [x] - Clean code, architecture structure, and thought process.
    [x] - Trade-offs and assumptions.
    [x] - Include a short README.md with setup steps and your explanation notes.
    [x] - Comments or a README.md explaining assumptions, scalability, and what you would implement in the future.
[ ] - delete clutter to avoid confusing evaluators with files that do not currently serve purpose
[ ] - notify hiring team
[ ] - keep improving the comments after submission
