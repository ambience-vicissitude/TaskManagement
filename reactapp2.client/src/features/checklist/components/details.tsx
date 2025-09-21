

import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { getWorkItem } from "../api"
import WorkItemsDirectory from "./../../workitem/components/directory"

export default function WorkItemDetailPage() {
    const { id } = useParams<{ id: number }>()

    const { data: checklist, isLoading, error } = useQuery({
        queryKey: ["checklist", id],
        queryFn: () => getWorkItem(id),
    })

    return (
        <div>
            <h2>{checklist.name}</h2>
            <WorkItemsDirectory checklistId={checklist.id} />
        </div>
    )
}