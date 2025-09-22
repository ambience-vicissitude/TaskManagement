/**
 * WorkItemDirectory component to display, add, and delete workitems.
 * 
 * This directory is a visual component that interacts with the workitem API
 * - allowing users to view existing workitems, create new ones, and delete unwanted ones.
 * - Utilizes React Query for efficient data fetching and state management.
 * - links to each workitem's detailed view.
 * - previews workitem's work items count, and completion status.
 * - does not support pagination or filtering.
 * 
 * @updated Sep 2025
 * @author bling
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getWorkItems, createWorkItem, deleteWorkItem } from "../api"
import type WorkItem from '../model'
import { useState } from "react"

interface WorkItemDirectoryProps {
    checklistId: number
}

const WorkItemDirectory: React.FC<WorkItemDirectoryProps> = ({ checklistId }) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    // READ
    const { data: workItems, error, isLoading } = useQuery({
        queryKey: ["workItems", checklistId],
        queryFn: () => getWorkItems(checklistId),
    })

    // CREATE
    // - will invalidate current list of work items and refetch from server
    // - balancing latest update from other users populating the same list for less optimistic on the caching being source of truth
    const createMutation = useMutation({
        mutationFn: createWorkItem,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workItems", checklistId] }),
    })

    // DELETE
    // - will invalidate current list of work items and refetch from server
    // - balancing latest update from other users populating the same list for less optimistic on the caching being source of truth

    // FIXME: figure out why this doesn't trigger the refetch of work items
    const deleteMutation = useMutation({
        mutationFn: deleteWorkItem,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workItems", checklistId] }),
    })

    if (isLoading) return <p>Loading workItems...</p>
    if (error) return <p style={ { color: "red" } }> Error: { (error as Error).message } </p>

    return (
        <div>
            <h2>Work Items</h2>
            <ul>

                {workItems?.map((wi: WorkItem) => {
                    return (
                        <li key={wi.id} style={{ marginBottom: "0.5rem" }}>
                            {/* Link to work items detail page */}
                            <a href={`/workitem/${wi.id}`} style={{ fontWeight: "bold" }}>
                                {wi.name}
                            </a>
                            <span>Work Item Status</span>
                            <button
                                onClick={() => deleteMutation.mutate(wi.id)}
                                style={{ marginLeft: "1rem" }}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>

            <form
                onSubmit = {(e) => {
                    e.preventDefault()
                    if (name.trim()) {
                        createMutation.mutate({ name, description, checklistId })
                        setName("")
                    }
                }}
            >
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder = "New workItem name" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="New workItem description" />
                <button type="submit" disabled = { createMutation.isPending } > Add </button>
            </form>
        </div>
    )
}

export default WorkItemDirectory;