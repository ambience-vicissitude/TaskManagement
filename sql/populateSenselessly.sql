-- ===================================================
-- # PopulateSenselessly.sql
--
-- Quickly generate data for the Item-Manager database without trying to add any real-life looking information
-- 
-- @updated Sep 2025
-- @author bling
-- ===================================================


-- Generate 100 WorkItems
WITH RECURSIVE cnt(x) AS (
  SELECT 1
  UNION ALL
  SELECT x+1 FROM cnt WHERE x < 100
)
INSERT INTO WorkItems (Name, Description, DueDate, IsComplete, IsDeleted, DeletedAt, AssignedTo, Priority, Category)
SELECT 
  'Task ' || x,
  'Description for task ' || x,
  strftime('%Y-%m-%dT%H:%M:%fZ', '2025-09-21', '+' || x || ' days'),
  x % 2,              -- alternate complete
  x % 3 == 0,         -- every 3rd marked deleted
  CASE WHEN x % 3 == 0 THEN strftime('%Y-%m-%dT%H:%M:%fZ', '2025-09-21', '+' || x || ' hours') END,
  'User' || (x % 10),
  CASE x % 3 WHEN 0 THEN 'High' WHEN 1 THEN 'Medium' ELSE 'Low' END,
  CASE x % 2 WHEN 0 THEN 'Work' ELSE 'Personal' END
FROM cnt;

-- Generate 100 Checklists
WITH RECURSIVE cnt(x) AS (
  SELECT 1
  UNION ALL
  SELECT x+1 FROM cnt WHERE x < 100
)
INSERT INTO Checklists (Name, Description, IsComplete, IsDeleted, DeletedAt)
SELECT 
  'Checklist ' || x,
  'Description for checklist ' || x,
  x % 2,
  x % 5 == 0,
  CASE WHEN x % 5 == 0 THEN strftime('%Y-%m-%dT%H:%M:%fZ', '2025-09-21', '+' || x || ' hours') END
FROM cnt;
