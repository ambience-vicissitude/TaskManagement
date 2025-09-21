/**
 * WorkItem API File
 * 
 * - responsible for workitem domain api communications CRUD
 * 
 * @updated Sep 2025
 * @author bling
 */

import type WorkItem from "./model"

const API_BASE = "/api/workitem"

// ---- CREATE ----
export async function createWorkItem(data: { name: string, description: string }): Promise<WorkItem> {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create work item")
    return res.json()
}

// ---- READ ----
export async function getWorkItems(): Promise<WorkItem[]> {
    const res = await fetch(`${API_BASE}`)
    if (!res.ok) throw new Error(`Failed to fetch work items for all checklists`)
    return res.json()
}

export async function getWorkItem(id: number): Promise<WorkItem> {
    const res = await fetch(`${API_BASE}/${id}`)
    if (!res.ok) throw new Error(`Failed to fetch work item ${id}`)
    return res.json()
}

// ---- UPDATE ----
export async function updateWorkItem(id: number, data: Partial<WorkItem>): Promise<WorkItem> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Failed to update work item ${id}`)
    return res.json()
}

// ---- DELETE ----
export async function deleteWorkItem(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error(`Failed to delete work item ${id}`)
    return res.json()
}
