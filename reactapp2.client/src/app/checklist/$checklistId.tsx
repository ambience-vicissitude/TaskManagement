/**
 * Checklist Route
 * 
 * @updated Sep 2025
 * @author bling
 */

import { createFileRoute } from '@tanstack/react-router'
import ChecklistDetailPage from "../../features/checklist/components/details"

export const Route = createFileRoute('/checklist/$checklistId')({
    component: ChecklistDetailRouteComponent,
})

/**
 * Returns ChecklistDetailPage feature to allow potential remapping of routes or changing of features in future
 * 
 * @returns ChecklistDetailPage by RouteParam id
 */
function ChecklistDetailRouteComponent() {
    const { checklistId } = Route.useParams()
    const id = parseInt(checklistId, 10);

    // Error state
    // parseInt returns NaN if no int found, but !id adds some robustness
    //
    // remarks: a reusable component can display as a page for any invalid state like this
    if (!id || isNaN(id)) return  <p>No checklist id found.</p>

    return <ChecklistDetailPage id={id} />
}

export default ChecklistDetailRouteComponent;