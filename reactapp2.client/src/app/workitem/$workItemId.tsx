/**
 * Work Item Route
 * 
 * @updated Sep 2025
 * @author bling
 */

import { createFileRoute } from '@tanstack/react-router'
import WorkItemDetailPage from '../../features/workitem/components/details'

export const Route = createFileRoute('/workitem/$workItemId')({
  component: WorkItemRouteComponent,
})

/**
 * Returns WorkItemDetailPage feature to allow potential remapping of routes or changing of features in future
 * 
 * @returns WorkItemDetailPage by RouteParam id
 */
function WorkItemRouteComponent() {
    const { workItemId } = Route.useParams()
    const id = parseInt(workItemId, 10);

    // Error state
    // parseInt returns NaN if no int found, but !id adds some robustness
    //
    // remarks: a reusable component can display as a page for any invalid state like this
    if (!id || isNaN(id)) return <p>No work item id found.</p>

    return <WorkItemDetailPage id={id} />
}

export default WorkItemRouteComponent;