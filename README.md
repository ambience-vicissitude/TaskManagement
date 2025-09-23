# TaskManagement

This is the Task Management App created from VS Studio Insiders as a .NET Core API with React solution. From this point, it evolved into a 'Todoist'-like application with checklists and work items within them. Any unique work item must exist and only exists within one checklist, it is not shared.

This code is owned and maintained by Bryan Ling. Please don't plagarise, I worked hard. TT_TT.

## Nomenclature

The app was created to be a Small Todo List that could be scalable to a Task Management app, similar to a backlog or KANBAN board. Certain terms were chosen for this domain to avoid clashing with C#/Javascript terms.

**Checklist**: is an instance of a todo list. This app allows users to create 1+ such unique lists. Each checklist can have unique work items that are not shared across other checklists
**Work Item**: is an instance of a 'task' on these 'todo lists'. Work Item was chosen instead of the word 'Task' because 'Task' is an asynchronous operation in C#, so it was not a good word to use. Todo felt like it could clash with 'TODO:' notes written by developers and is also not a real word. 'Item' was too simple, so 'Work Item' was chosen to be definitive and unique, and shows the 'thought process' of scaling to a collaborative actionables list-making application in the future.
**User**: is a unique user using the app. They can have several sessions of the app open, so concurrency is possible. For this prototype, users, login process, and groups/organizations have not been built, but have been considered.

## Installation and Setup

This app was built from the `.NET EF Core and React` template. This was done for simplicity and ease of setup. Many of the settings and add-on possibilities are delegated to VS Studio to provide for the developers. This saved time, but slightly compromises my own understanding of every moving part. Not all defaults may be desireable long-term or team-wide. I also believe it makes it slightly trickier to separate the API and Frontend piece, however it should be possible as React apps can launch with only npm/Node piece. I believe it is harder to separate a .NET Core EF application away from VS Studio, but this is a choice, and .NET is well supported. There is merit in .NET and its compatibilities and support in the Azure/Windows/Microsoft ecosystem.

### Developer Setup

1. Clone the GIT repos into your local machine, preferably a Windows Machine.
1. Have VS Studio installed (2022 or later). VS Code is great but insufficient for running VS solution files.
1. Click START at the top. This should launch both the API Service and the Frontend App automatically in a browser. Check to ensure you have Chrome installed or edit the Configuration Manager as needed
1. In the browser, you should see the frontend app accessible at https://localhost:51916/

See https://visualstudio.microsoft.com/downloads/ for VS Studio downloads. This will install the .NET/C# runtimes needed to launch .NET EF Core and React application.
For better SQL experience, you could install SQLite and set it to PATH, or add the VS Studio extension 'SQLite/SQL Server Compact Toolbox'.

### Deployment Setup

There are no current plans to deploy, so I will leave this section blank.

## Features

Please also read `FEATURES.md` for more details.

### Crud

- **CRUD of a checklist**
    - create a checklist
    - read a checklist
    - read checklists without filter
    - update a checklists completion status
    - soft-delete a checklist

- **CRUD of a work item**
    - create a work item
    - read a work item
    - read work items by a single checklist or all work items all at once
    - update a work items completion status
    - soft-delete a work item

Note: Due to time constraints, the 'editing' of an existing work item or checklist (their name / description) was de-prioritized. The API supports it, but the frontend does not called it.

### Work Item Assignment

- assigning work items to checklists
    - due to time constraints, any new work item is only created from a checklist directory page. therefore, by way of the UI, it would appear work items must be associated with a checklist. But this constraint is not enforced in the backend at this time.

### Deleted Work Items / Checklist 30Day auto cleanup

- 30 day auto .net service cleanup (not reliable for long term, but good enough for now)

## Future enhancements 

Future aspirations include moving in the 'Atlassian - JIRA' or 'Azure DevOps' direction in turning the 'work items' into more of a ticket system.
Please also read `FEATURES.md` for more details.

### Prioritization and Assignment

- assigning work items a priority by range of 1 - 5 only, 1 being most paramount
- sorting work items in a checklist by priority
- work item assignment to a user by name string or actual user entity
- work items have levels, priorities, categories, assigned user or users, assigned groups and permissions
- checklists have types, assigned user or users, assigned groups and permissions
- making the checklist or work items 'order-sensitive', currently checklists and work items always appear in the order of creation (or in same order as the result of table rows in the DB)

### Other Work Item / Checklist features

- make work items or checklists repeatable, copying or renewing previously completed items or checklists to avoid retyping them
- viewing soft-deleted work items or checklists
- filtering the work items or checklists by associative properties like categories, datetime range, users or groups, etc.
- pagination

### UI Polishing

- any permanent/consequential user actions could have a 'Are you sure?' prompt to prevent human error, for example: deleting or editting
- when deleting something, the ui does hang a few moments longer than expected, so a transitional state will improve the UX 

### Visualization

- data visualizations like work boards
- graphs to show the progression of checklists and work items over time
- ability to drag and drop work items between checklists or to resort them

### Authentication and Security

- OAuth2 authentication and authorization, user permissions, groups and organizations and tiers
- Beyond authentication and authorization, better consideration needs to be done into whether or not the API is secured. Here's a shortlist:
    - controlling access via user / group permissions to avoid accidental leakages between entities or to outside/external/public
    - data encryption (TLS/HTTPS, http-only secure cookies on client browser)
    - input invalidation to prevent SQL injection, XSS, etc.
    - rate limiting, throttling to avoid DoS attacks or misuse/abuse
    - logging and monitoring to see suspicious activity or unusual spikes in api usage or multiple failed login attempts
    - versioning the API like `/api/v1.0.1/checklist` to avoid or regulate breaking changes
    - be careful when setting up deployment or development versions that have varied HTTP or CORS/Origin policies
    - exposing sensitive data like passwords or identifiers
    - using proper security headers in requests and communications
    - Consider OWASP guidelines
    - Setting up maintainence windows to update/audit npm or C#/.NET packages, servers used or other dependencies

### Exporting data, Sharing Data

- better sharing between 'user/group entities'
- export of data, import and integrations with other todo list or task management systems
- send by email / text

### Scalability Considerations

CAP Theorem trade-offs:

- Consistency, Availability, Partition Tolerance (C, A, P) cannot all be fully achieved simultaneously; systems typically optimize for two out of three.
    - Consider performance, latency, and fault tolerance when making trade-offs.
- Maintainability and modularity:
    - Designing for componentization ensures easier scaling, testing, and upgrades.

Hypothetical scenario:

Suppose this application is used by teams in real-time, with peak usage hours and potential spikes far beyond expected traffic. To handle this safely, the system must support, for example, 2x or even 10x the expected peak volume. This may require:

- Database replication to ensure multiple accessible instances. Read replicas could distribute the high read query volume
- Caching would carry some load for frequently read data. Indices, Views/Materialized views are options too.
- Partitioning or sharding for tables that experience disproportionate load.
- Cross-region or cross-team database distribution to maintain performance and availability.
- auto-scaling of cloud containers

Key considerations include:

- Data consistency and potential availability issues when splitting databases.
- Disaster recovery planning to prevent loss during failures.
- Data privacy implications: partitioning and replication must avoid exposing sensitive organizational data or making it trivial to infer ownership. This is soluble via multi-tenancy.
- Proper hashing and scrambling of data to maintain confidentiality across regions or tenants.
- horizontally scaling would make more sense if multi-user traffic is the main scaling unit.

## Issues Backlog

The following is a list of known issues that came up during development which have been added to a backlog for future considerations. There is no particular order, time-sensitivity, complexity, or priority, just a raw dump of problems.

### ReactApp2.Server (.NET Core API)

- the Interface/Abstracting would depend heavily on domain/business this api is targeting during its service life
    - better use of interfaces to lock in business logic and communicate these structures to the next developer/feature
- expansion of API's endpoints and powers must consider the implications of the n+1 problem
- testability is a concern, this was skipped in favor of rapid development
    - anti-DRY is sufficient at this point to giving less power to the interfaces and more ability to teardown and rebuild
- EF Core has many service configurations that are possible in Program.cs that are imperative and declarative in nature. I also did not fully utilize its abilities, but am aware many more useful features can be turned on via `builder.Services.Add...();` or `app.Use...();`
- 422 unprocessable entity is a 'request' validation readily used in FastAPI Python that helps validate models via data annotations. I am aware this is available in .NET Core EF via DTOs, and I did not fully implement this feature.
- error handling and request case handling, for prototype and speed I went with the default IActionResult OK() NotFound(), however, there is a case for creating custom status code handlers, custom error / exception handlers and classes, such that you can control the access of information or modify exception messaging to show or hide stack traces or make messages more readable to the target recipient of that exception.
    - For example, an end-user should not see details of an SQL crash report or a .NET stack trace, they should see something simple but not default. They could read an error message directly from the backend that denotes 500 Internal Server Error but also be told 'Oops! the server is down' rather than see a generic IIS 500 error page.
- optimistic concurrency control to handle race conditions _is not done_

### reactapp2.client (React with Tanstack Query, Router)

- the choices for npm packages and going in the tanstack direction needs evaluation based on longterm service requirements of the app
    - do we expect to reuse components in other applications
    - do we expect to pivot the application's pages or layout, its themes or features
    - will the application continue onwards as an SPA
- the growth of state management in the application may move along three levers
    1. the global state (use...() vs zustand)
    2. the query state (axios vs fetch, tanstack query)
- testability is a concern, this was skipped in favor of rapid development
    - anti-DRY is sufficient at this point to gather feedback in case development moves in a new direction
- duplicate request cancellation
    - in the frontend, in some cases, if a user makes a duplicate request before a previous identical request is done, the previous identical request should be cancelled, or vice versa.

### Misc

- clean up the documentation (docstrings, function heads, class heads)
    - it is not good to put too many remarks in a real product, but for this assignment I wanted to be verbose

- rename project ReactApp2 -> Item Manager
    - there was file lock and loss of synchronization of the vs solution when changing the project name
- rename project ReactApp2.Server -> item-manager-api-db
    - there was file lock and loss of synchronization of the vs solution when changing the project name
- rename project reactapp2.client -> item-manager-frontend
    - there was file lock and loss of synchronization of the vs solution when changing the project name

- separate item-manager-api from item-manager-db and migrate from sqlite to postgres or other sql solution to utilize fuller support of sql tools like views, materialized views, advanced indices, replication, availability, backends, scalability, etc.
    - limitations of sqlite are known (no replication, no stored procedures, no triggers, more advanced user permissions, handling failover, partitioning/sharding)

- see if robust migrations via EF Core could be outweighed by an alternative

- microservice communications are HTTP requests, but could there be use case for GRCP, or use case for message-broker technologies like kafka or rabbitmq
- considerations for using caching or redis or nosql, cassandradb, hadoop, other data storage solutions
- better define the business/domain

- inter-instance, multiprocessing, multithreading, multiple logins of the same user, async operations like download requests or backup operation requests, disaster recovery
    - if server A was used by a user, then it goes down, what is the minimal loss
    - do we route traffic using multiple servers using what type of prioritization
        - any user can go to any server
        - a user is assigned to one server
        - master/slave server setup
        - regional servers
        - etc.

- task management basically can run into all sorts of scheduling problems at any point, from the user-level to the backend, to live data feeds vs historical data feeds

- testing solutions for e2e, integration, unit, feature, UI component

- long term maintainence of data, the database will grow, checklists and work items will grow, and eventually the cleanup service will need to be re-evaluated

- manage code better with .gitignore, settings.json, constants, and sensitive .env variables, and not committing the app.db to repo
