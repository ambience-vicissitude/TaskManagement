

import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { getWorkItem } from "../api"

export default function WorkItemDetailPage() {
    const { id } = useParams<{ id: number }>()

    const { data: workItem, isLoading, error } = useQuery({
        queryKey: ["workItem", id],
        queryFn: () => getWorkItem(id),
    })

    return (
        <div>
            <h3>Work Item Detail</h3>
            <p><strong>Name:</strong> {workItem.name}</p>
            <p><strong>Description:</strong> {workItem.description}</p>
            <p><strong>Status:</strong> {workItem.isCompleted ? "Completed" : "Pending"}</p>
        </div>
    )
}