-- ===================================================
-- # PopulateSensibly.sql
--
-- Quickly generate data for the Item-Manager database with some real-life looking data
-- 
-- @updated Sep 2025
-- @author bling
-- ===================================================


-- ==========================================
-- INSERT CHECKLISTS (10+ rows)
-- ==========================================
INSERT INTO CHECKLISTS (Name, Description, IsComplete, IsDeleted, DeletedAt) VALUES
('Weekly Team Meeting Prep', 'Prepare all items for the weekly sync with the team', 0, 0, NULL),
('Website Launch', 'Checklist for launching the new marketing website', 0, 0, NULL),
('Home Renovation', 'Tasks related to living room and kitchen renovation', 0, 0, NULL),
('Monthly Budget Review', 'Review income and expenses for the month', 0, 0, NULL),
('Fitness Program', 'Personal fitness and nutrition tracking', 0, 0, NULL),
('Client Onboarding', 'Steps to onboard new clients efficiently', 0, 0, NULL),
('Product Launch Campaign', 'Marketing campaign for new product', 0, 0, NULL),
('Quarterly Report', 'Prepare quarterly report for stakeholders', 0, 0, NULL),
('Team Training', 'Schedule and track training sessions', 0, 0, NULL),
('Conference Preparation', 'Tasks for upcoming industry conference', 0, 0, NULL),
('Bug Fix Sprint', 'Track software bugs to fix in this sprint', 0, 0, NULL),
('Social Media Calendar', 'Plan posts and campaigns', 0, 0, NULL),
('Office Relocation', 'Tasks for moving office to new location', 0, 0, NULL),
('Client Feedback Review', 'Compile and review feedback from clients', 0, 0, NULL),
('Research Project', 'Manage research tasks and milestones', 0, 0, NULL),
('Marketing Analytics', 'Collect and analyze marketing data', 0, 0, NULL),
('Website Content Update', 'Update blog posts and landing pages', 0, 0, NULL),
('Product Testing', 'QA and testing for new product features', 0, 0, NULL),
('Inventory Audit', 'Check inventory levels and update records', 0, 0, NULL),
('Event Planning', 'Organize team or public events', 0, 0, NULL),
('Weekly Team Meeting Prep (2)', 'Follow-up items for team meeting', 0, 0, NULL),
('Website Launch Phase 2', 'Next steps for website launch', 0, 0, NULL),
('Home Renovation Phase 2', 'Kitchen appliances and decor tasks', 0, 0, NULL),
('Monthly Budget Review (2)', 'Check Q3 budget adjustments', 0, 0, NULL),
('Fitness Program - Nutrition', 'Track meals and diet', 0, 0, NULL);

-- ==========================================
-- INSERT WORKITEMS (10+ rows)
-- ==========================================
INSERT INTO WORKITEMS (Name, Description, DueDate, IsComplete, IsDeleted, DeletedAt, AssignedTo, Priority, Category) VALUES
('Create agenda', 'Prepare the agenda for Monday team meeting', '2025-09-22T09:00:00.000Z', 0, 0, NULL, 'Alice', 'High', 'Weekly Team Meeting Prep'),
('Send invites', 'Email all participants for the weekly meeting', '2025-09-21T17:00:00.000Z', 1, 0, NULL, 'Bob', 'Medium', 'Weekly Team Meeting Prep'),
('Review homepage mockup', 'Check the homepage design before launch', '2025-09-23T12:00:00.000Z', 0, 0, NULL, 'Charlie', 'High', 'Website Launch'),
('Finalize copy for landing page', 'Ensure all text is approved', '2025-09-22T15:00:00.000Z', 0, 0, NULL, 'Dana', 'Medium', 'Website Launch'),
('Order paint supplies', 'Buy paint and brushes for renovation', '2025-09-24T10:00:00.000Z', 0, 0, NULL, 'Eve', 'High', 'Home Renovation'),
('Schedule training', 'Book sessions with trainer', '2025-09-25T14:00:00.000Z', 0, 0, NULL, 'Frank', 'Medium', 'Fitness Program'),
('Collect client documents', 'Ensure all onboarding docs are signed', '2025-09-21T16:00:00.000Z', 1, 0, NULL, 'Grace', 'High', 'Client Onboarding'),
('Design campaign assets', 'Create graphics for launch', '2025-09-26T11:00:00.000Z', 0, 0, NULL, 'Alice', 'High', 'Product Launch Campaign'),
('Compile quarterly numbers', 'Prepare Excel sheets for review', '2025-09-27T17:00:00.000Z', 0, 0, NULL, 'Bob', 'Medium', 'Quarterly Report'),
( 'Book conference venue', 'Confirm location and setup', '2025-09-28T13:00:00.000Z', 0, 0, NULL, 'Charlie', 'High', 'Conference Preparation'),
('Fix login bug', 'Resolve authentication errors', '2025-09-29T10:00:00.000Z', 0, 0, NULL, 'Dana', 'High', 'Bug Fix Sprint'),
('Update blog post', 'Revise SEO for latest article', '2025-09-30T09:00:00.000Z', 0, 0, NULL, 'Eve', 'Medium', 'Website Content Update'),
('QA feature X', 'Test new product functionality', '2025-10-01T15:00:00.000Z', 0, 0, NULL, 'Frank', 'High', 'Product Testing'),
('Audit inventory', 'Count items in stock', '2025-10-02T11:00:00.000Z', 0, 0, NULL, 'Grace', 'Medium', 'Inventory Audit'),
('Plan team lunch', 'Organize catering and invitations', '2025-10-03T12:00:00.000Z', 0, 0, NULL, 'Alice', 'Low', 'Event Planning');

