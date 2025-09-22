//import { test, expect } from "@playwright/test"

//// test for user's ability to add, view, edit, complete, and delete checklists

//test.describe("Checklists E2E", () => {
//    test("user can add and view a checklist", async ({ page }) => {
//        // Go to Checklists page
//        await page.goto("http://localhost:5173/checklists")

//        // Add a new checklist
//        await page.fill('input[placeholder="Add a checklist"]', "Write E2E test")
//        await page.click('button:has-text("Add")')

//        // Assert that the new checklist appears in the list
//        const checklistItem = page.locator("li", { hasText: "Write E2E test" })
//        await expect(checklistItem).toBeVisible()
//    })

//    test("user can mark a checklist as completed", async ({ page }) => {
//        await page.goto("http://localhost:5173/checklists")

//        // Assume first checklist has a checkbox
//        const firstChecklistCheckbox = page.locator("li:first-child input[type=checkbox]")

//        await firstChecklistCheckbox.check()
//        await expect(firstChecklistCheckbox).toBeChecked()
//    })

//    test("user can delete a checklist", async ({ page }) => {
//        await page.goto("http://localhost:5173/checklists")

//        // Add a test checklist for deletion
//        await page.fill('input[placeholder="Add a checklist"]', "Delete me")
//        await page.click('button:has-text("Add")')

//        const checklistItem = page.locator("li", { hasText: "Delete me" })
//        await expect(checklistItem).toBeVisible()

//        // Click delete button (assumes button inside li)
//        await checklistItem.locator('button:has-text("Delete")').click()

//        // Ensure checklist is removed
//        await expect(checklistItem).toHaveCount(0)
//    })
//})
