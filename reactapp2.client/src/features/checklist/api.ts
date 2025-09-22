/**
 * Checklist API File
 * 
 * - responsible for checklist domain api communications CRUD
 * - will indirectly CRUD workitems domain, but not directly interact
 * 
 * @updated Sep 2025
 * @author bling
 */

import type Checklist from "./model"

const API_BASE = "/api/checklist"

// ---- CREATE ----
export async function createChecklist(data: { name: string, description: string }): Promise<Checklist> {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create checklist")
    return res.json()
}

// ---- READ ----
export async function getChecklists(): Promise<Checklist[]> {
    const res = await fetch(API_BASE)
    if (!res.ok) throw new Error("Failed to fetch checklists for all users")
    return res.json()
}

export async function getChecklist(id: number): Promise<Checklist> {
    const res = await fetch(`${API_BASE}/${id}`)
    if (!res.ok) throw new Error(`Failed to fetch checklist ${id}`)
    return res.json()
}


// ---- PATCH COMPLETE ----
// semantically this is a partial update of checklist entity (only affecting its 'completed' field)
export async function patchChecklistAsCompleteOrIncomplete(
    id: number,
    isComplete: boolean
): Promise<Checklist> {
    const res = await fetch(`${API_BASE}/${id}?isComplete=${isComplete}`, {
        method: "PATCH",
    })
    if (!res.ok) throw new Error(`Failed to patch completion for checklist ${id}`)
    return res.json()
}

// ---- PUT UPDATE ----
// semantically this is a near-full update of checklist entity (without affecting its workitem relationships)
export async function updateChecklist(id: number, data: Partial<Checklist>): Promise<Checklist> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Failed to update checklist ${id}`)
    return res.json()
}

// ---- DELETE ----
export async function deleteChecklist(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error(`Failed to delete checklist ${id}`)
    return res.json()
}
