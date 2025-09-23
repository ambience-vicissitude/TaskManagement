/**
 * Work Item details
 * 
 * @updated Sep 2025
 * @author bling
 */

import { useQuery } from "@tanstack/react-query"
import { getWorkItem } from "../api"

/**
 * WorkItemDetailPage
 * 
 * A component that shows the details of a work item
 * 
 * @description the use of WorkItem as a Prop Type is over-engineering
 * 
 * @param id work item identifier
 * @returns render
 */
const WorkItemDetailPage: React.FC<{ id: number }> = ({ id }) => {

    const { data: workItem, isLoading, error } = useQuery({
        queryKey: ["workItem", id],
        queryFn: () => getWorkItem(id),
    })

    if (isLoading) return <p>Loading work item details...</p>
    else if (workItem) return (
        <div>
            <h3>Work Item Detail</h3>
            <p><strong>Name:</strong> {workItem.name}</p>
            <p><strong>Description:</strong> {workItem.description}</p>
            <p><strong>Status:</strong> {workItem.isComplete ? "Completed" : "Pending"}</p>
        </div>
    )
    else if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
    else return <p>No work item found.</p>
}

export default WorkItemDetailPage;