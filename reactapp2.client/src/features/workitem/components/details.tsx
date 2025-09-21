import { useQuery } from "@tanstack/react-query"
import { getWorkItem } from "../api"
import type WorkItem from "../model"

const WorkItemDetailPage: React.FC<WorkItem> = ({ id }) => {

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