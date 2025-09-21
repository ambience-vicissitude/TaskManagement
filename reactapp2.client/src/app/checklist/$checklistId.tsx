import { useParams } from "@tanstack/react-router"
import { WorkItemsList } from "../../features/workitems/components/WorkItemsList"
import { getWorkItem } from "../../features/checklists/api/checklistsApi"
import { useQuery } from "@tanstack/react-query"

export default function WorkItemDetailPage() {
    const { checklistId } = useParams<{ checklistId: string }>()
    const { data: checklist } = useQuery({
        queryKey: ["checklist", checklistId],
        queryFn: () => getWorkItem(checklistId),
    })

    if (!checklist) return <p>Loading...</p>

    return (
        <div>
            <h2>{checklist.title}</h2>
            <WorkItemsList checklistId={checklist.id} />
        </div>
    )
}
