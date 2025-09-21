# ReactApp2

This is the Task Management App created from VS Studio Insiders as a .NET Core API with React solution. From this point, it evolved into a 'Todoist'-like application with checklists and work items within them. Any unique work item must exist and only exists within one checklist, it is not shared.

## Features

Features expected by Sep 24 include:

### Crud

- CRUD of a checklist
- CRUD of a work item

### Work Item Assignment

- assigning work items to checklists
- assigning work items to a user by a name string only

### Work Item Prioritization

- assigning work items a priority by range of 1 - 5 only, 1 being most paramount
- sorting work items in a checklist by priority

### Deleted Work Items / Checklist 30Day auto cleanup

- 30 day auto .net service cleanup (not reliable for long term, but good enough for now)

## Future enhancements 

Future aspirations include moving in the 'Atlassian - JIRA' or 'Azure DevOps' direction in turning the 'work items' into more of a ticket system.

- work items have levels, priorities, categories, assigned user or users, assigned groups and permissions
- checklists have types, assigned user or users, assigned groups and permissions
- graphs to show the progression of checklists and work items over time
- OAuth2 authentication and authorization, user permissions, groups and organizations and tiers
- better sharing between 'user/group entities'
- export of data, import and integrations with other todo list or task management systems
- data visualizations like work boards
- send by email / text

- general CAP Theorem scalability (consistency, availability, partition tolerance), performance/latency, fault tolerant
    - it would be hard to support all C, A, P, it is typically 2 / 3.
- maintainability, modularity (componentization)

## Issues Backlog

The following is a list of known issues that came up during development which have been added to a backlog for future considerations. There is no particular order, time-sensitivity, complexity, or priority, just a raw dump of problems.

### ReactApp2.Server (.NET Core API)

- the Interface/Abstracting would depend heavily on domain/business this api is targeting during its service life
    - better use of interfaces to lock in business logic and communicate these structures to the next developer/feature
- expansion of API's endpoints and powers must consider the implications of the n+1 problem
- testability is a concern, this was skipped in favor of rapid development
    - anti-DRY is sufficient at this point to giving less power to the interfaces and more ability to teardown and rebuild

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

### Misc

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
        - etc.

- task management basically can run into all sorts of scheduling problems at any point, from the user-level to the backend, to live data feeds vs historical data feeds