import { getChecklist } from "../../features/checklist/api"
import { useQuery } from "@tanstack/react-query"
import ChecklistDetailPage from "../../features/checklist/components/details"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checklist/$checklistId')({
    component: ChecklistDetailRouteComponent,
})

function ChecklistDetailRouteComponent() {
    const { checklistId } = Route.useParams()
    const id = parseInt(checklistId, 10);

    // fetch checklist on condition there is a valid integer id
    const { data: checklist } = useQuery({
        queryKey: ["checklist", id],
        queryFn: () => getChecklist(id),
        enabled: Number.isInteger(id),
    })

    // TODO: handle possible errors from useQuery

    // Error state
    // parseInt returns NaN if no int found, but !id adds some robustness
    if (!id || isNaN(id)) {
        // TODO: better error handling component
        return <p>Invalid checklist ID.</p>;
    }

    // Loading state
    if (!checklist) return <p>Loading...</p>

    // Main render
    return (
        <div>
            <h2>{checklist.name}</h2>
            <p>{checklist.description}</p>
            <ChecklistDetailPage id={id} />
        </div>
    )
}

export default ChecklistDetailRouteComponent;