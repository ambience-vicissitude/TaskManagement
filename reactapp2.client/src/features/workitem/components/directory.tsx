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
import { useRouter } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getWorkItems, createWorkItem, deleteWorkItem, patchWorkItemAsCompleteOrIncomplete } from "../api"
import AddItemForm from "../../layout/AddItemForm"
import DirectoryList from "../../layout/DirectoryList"

interface WorkItemDirectoryProps {
    checklistId: number
}

/**
 * WorkItemDirectory
 * 
 * A component that displays a list of checklists provided by the fetch
 * Able to CRUD checklists that are accessible to the user session
 * 
 * Able to filter for work items by checklistId
 * 
 * @param checklistId unique checklist identifier
 * @returns rendering
 */
const WorkItemDirectory: React.FC<WorkItemDirectoryProps> = ({ checklistId }) => {
    const queryClient = useQueryClient()

    // Back button
    const router = useRouter();

    // READ workItems
    const { data: workItems, error, isLoading } = useQuery({
        queryKey: ["workItems", checklistId],
        queryFn: () => getWorkItems(checklistId),

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
    const refreshNow = () => queryClient.invalidateQueries({ queryKey: ['workItems'] })

    // CREATE
    // - will invalidate current list of work items and refetch from server
    // - balancing latest update from other users populating the same list for less optimistic on the caching being source of truth
    const createMutation = useMutation({
        mutationFn: createWorkItem,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workItems", checklistId] }),
    })

    // PATCH ISCOMPLETE
    // - will invalidate current list of work items and refetch from server
    // - balancing latest update from other users CRUD-ing work items
    const patchCompletionMutation = useMutation({
        mutationFn: async ({ id, isComplete }: { id: number; isComplete: boolean }) => patchWorkItemAsCompleteOrIncomplete(id, isComplete),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workItems"] }),
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
            <h2 className="text-2xl font-semibold text-gray-800 mt-2 py-2">Work Items</h2>
            <button
                onClick={refreshNow}
                title="Sync the list with server on demand"
            >
                Refresh
            </button>

            <DirectoryList
                items={workItems!} // safe to assume non-null because isLoading and error are covered
                onCardClick={id => window.location.href = `/workitem/${id}`}
                onToggleComplete={(id: number, isComplete: boolean) =>
                    patchCompletionMutation.mutate({ id, isComplete })
                }
                onDelete={(id: number) => deleteMutation.mutate(id)}
            />

            <AddItemForm
                title="Add a new work item below:"
                checklistId={checklistId}
                onCreate={(name, description, checklistId) =>
                    createMutation.mutate({ name, description, checklistId: checklistId! })}
                pending={createMutation.isPending}
                placeholderName="New work item name"
                placeholderDescription= "New work item description"
            />

            <button
                onClick={() => router.history.back()} // is not bulletproof, but reliable in most cases
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 my-2"
            >
                &larr; Back
            </button>
        </div>
    )
}

export default WorkItemDirectory;
