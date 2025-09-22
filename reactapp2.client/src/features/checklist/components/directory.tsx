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
    // - will invalidate current list of checklists and refetch from server
    // - balancing latest update from other users CRUD-ing checklists
    const createMutation = useMutation({
        mutationFn: createChecklist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checklists"] }),
    })

    // DELETE
    // - will invalidate current list of checklists and refetch from server
    // - balancing latest update from other users CRUD-ing checklists
    const deleteMutation = useMutation({
        mutationFn: deleteChecklist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checklists"] }),
    })

    // TODO: better use of 
    // https://tanstack.com/query/latest/docs/framework/react/guides/mutations?from=reactQueryV3#_top
    // https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates#via-the-cache
    // cancellation and invalidation

    if (isLoading) return <p>Loading checklists...</p>
    if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>

    return (
        <div>
            <h2>Checklists</h2>
            <ul>
                {checklists?.map((cl: Checklist) => {
                    return (
                        <li key={cl.id} style={{ marginBottom: "0.5rem" }}>
                            {/* Link to checklist page */}
                            <a href={`/checklist/${cl.id}`} style={{ fontWeight: "bold" }}>
                                {cl.name}
                            </a>
                            <span>Work Items completed (TODO:)</span>
                            <button
                                onClick={() => deleteMutation.mutate(cl.id)}
                                style={{ marginLeft: "1rem" }}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
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
