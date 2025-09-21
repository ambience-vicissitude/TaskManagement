import { getChecklist } from "../../features/checklist/api"
import { useQuery } from "@tanstack/react-query"
import ChecklistDetailPage from "../../features/checklist/components/details"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checklist/$checklistId')({
    component: ChecklistDetailRouteComponent,
})

function ChecklistDetailRouteComponent() {
    const { checklistId } = Route.useParams()
    const { data: checklist } = useQuery({
        queryKey: ["checklist", checklistId],
        queryFn: () => getChecklist(parseInt(checklistId, 10)),
    })

    if (!checklist) return <p>Loading...</p>
    console.log(checklist);
    return (
        <div>
            <h2>{checklist.name}</h2>
            <p>{checklist.description}</p>
            <ChecklistDetailPage id={parseInt(checklistId, 10)} />
        </div>
    )
}

export default ChecklistDetailRouteComponent;