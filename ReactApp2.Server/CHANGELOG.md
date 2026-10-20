# v1.0.0
This file explains how Visual Studio created the project.

The following steps were used to generate this project:
- Create new ASP\.NET Core Web API project.
- Update project file to add a reference to the frontend project and set SPA properties.
- Update `launchSettings.json` to register the SPA proxy as a startup assembly.
- Add project to the startup projects list.
- Write this file.

# v1.0.1
## Server
- Added CRUD capabilities to workitems and work items
- Any user can now create and edit name or description, or delete workitems and work items
- Add soft-delete capabilities, where deleted items are marked as deleted but not removed from the database until the CleanupServices run
## Client
- Added basic UI to create, view, edit and delete workitems and work items

# v.1.0.2
## Server
- WorkItems and work items can now be marked as completed
## Client
- Added ability to mark workitems and work items as completed
- Added ability to unmark workitems and work items back to incomplete

# v.1.0.3
## Server
- Added user authentication and authorization
- Users can now register and login, and edit their own workitems and work items
- Only the owner of a workitem or work item can view, edit or delete it
- WorkItems and work items are now associated with a user and can be marked as completed

# v.1.0.4
## Server
- Update outdated dependencies like AspNetCore.OpenApi, SQLitePCLRaw.lib.e_sqlite3 (to keep sqlite for now)

# v.1.0.5+
Potential future updates include:  
## User
  - User profile management (e.g., change password, update email)
  - User roles and permissions (e.g., admin users who can manage all workitems and work items)
  - User activity logs to track changes made to workitems and work items
  - User can now reset their password via email
  - User can share workitems with other users with view or edit permissions
## Collaborative Capabilities
  - Groups/Teams to allow multiple users to collaborate on shared workitems
## WorkItem and Work Item Enhancements
  - Adding due dates and reminders for work items
  - Adding tags or categories for workitems and work items
  - Adding collaboration features to share workitems with other users
  - Adding more advanced filtering and sorting options for workitems and work items
## General Improvements
  - Improving the UI/UX design of the client application
  - Adding tests for both server and client applications
  - Implementing better error handling and validation on both server and client sides
  - Adding pagination or infinite scrolling for long lists of workitems or work items
  - Implementing a mobile-friendly design for the client application
  - Integrating with third-party services like calendar apps or task management tools.
