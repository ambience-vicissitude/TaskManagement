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
import { getChecklists, createChecklist, deleteChecklist, patchChecklistAsCompleteOrIncomplete } from "../api"
import type Checklist from '../model'
import DirectoryList from "../../layout/DirectoryList"
import AddItemForm from "../../layout/AddItemForm"

/**
 * ChecklistDirectory
 * 
 * A component that displays a list of checklists provided by the fetch
 * Able to CRUD checklists that are accessible to the user session
 * 
 * @description can extend ChecklistDirectory to 'filter by user' in future enhancements
 * 
 * @returns rendering
 */
function ChecklistDirectory() {
    const queryClient = useQueryClient()

    // READ checklists
    const { data: checklists, error, isLoading } = useQuery<Checklist[]>({
        queryKey: ["checklists"],
        queryFn: getChecklists,

        // auto-refetch is a polling interval strategy to keep the list update under the hood
        //
        // TODO: make an app .env or settings
        // TODO: add a UX 'last updated' message and make sure the user is not seeing glitches of updates
        //
        // the con to the refetch is if there's some error or hanging request,
        // this doesn't stop useQuery from trying and retrying the problematic request again and again in the browser
        refetchInterval: 5_000,
    })

    // READ by Refresh
    // TODO: should add a UX loader
    const refreshNow = () => queryClient.invalidateQueries({ queryKey: ['checklists'] })

    // CREATE
    // - will invalidate current list of checklists and refetch from server
    // - balancing latest update from other users CRUD-ing checklists
    const createMutation = useMutation({
        mutationFn: createChecklist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checklists"] }),
    })

    // PATCH ISCOMPLETE
    // - will invalidate current list of checklists and refetch from server
    // - balancing latest update from other users CRUD-ing checklists
    const patchCompletionMutation = useMutation({
        mutationFn: async ({ id, isComplete }: { id: number; isComplete: boolean }) => patchChecklistAsCompleteOrIncomplete(id, isComplete),
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
            <h2 className="text-2xl font-semibold text-gray-800 mt-2 py-2">Checklists</h2>
            <button
                onClick={refreshNow}
                title="Sync the list with server on demand"
            >
                Refresh
            </button>

            <DirectoryList
                items={checklists!} // safe to assume non-null because isLoading and error are covered
                onCardClick={id => window.location.href = `/checklist/${id}`}
                onToggleComplete={(id: number, isComplete: boolean) =>
                    patchCompletionMutation.mutate({ id, isComplete })
                }
                onDelete={(id: number) => deleteMutation.mutate(id)}
            />

            <AddItemForm
                title="Add a new checklist below:"
                onCreate={(name, description) =>
                    createMutation.mutate({ name, description })}
                pending={createMutation.isPending}
                placeholderName="New checklist name"
                placeholderDescription="New checklist description"
            />
        </div>
    )
}

export default ChecklistDirectory;
