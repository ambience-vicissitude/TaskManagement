/**
 * CheckListDirectory component to display, add, and delete checklists.
 * 
 * This directory is a visual component that interacts with the checklist API
 * - allowing users to view existing checklists, create new ones, and delete unwanted ones.
 * - Utilizes React Query for efficient data fetching and state management.
 * - links to each checklist's detailed view.
 * - previews checklist's work items count, and completion status.
 * - does not support pagination or filtering.
 * 
 * @updated Sep 2025
 * @author bling
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getChecklists, createChecklist, deleteChecklist } from "../api"
import type Checklist from '../model'
import { useState } from "react"

export default function ChecklistDirectory() {
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    // READ
    const { data: checklists, error, isLoading } = useQuery({
        queryKey: ["checklists"],
        queryFn: getChecklists,
    })

    // CREATE
    const createMutation = useMutation({
        mutationFn: createChecklist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checklists"] }),
    })

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: deleteChecklist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checklists"] }),
    })

    if (isLoading) return <p>Loading checklists...</p>
    if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>

    return (
        <div>
            <h2>Checklists</h2>
            <ul>
                {checklists?.map((cl: Checklist) => (
                    <li key={cl.id}>
                        <strong>{cl.name}</strong>{" "}
                        <button onClick={() => deleteMutation.mutate(cl.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (name.trim()) {
                        createMutation.mutate({ name, description })
                        setName("")
                    }
                }}
            >
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New checklist" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="New checklist description" />
                <button type="submit" disabled={createMutation.isPending}>Add</button>
            </form>
        </div>
    )
}
