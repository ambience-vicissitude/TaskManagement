import { createFileRoute } from '@tanstack/react-router'
import { getWorkItem } from '../../features/workitem/api'
import { useQuery } from '@tanstack/react-query'
import WorkItemDetailPage from '../../features/workitem/components/details'

export const Route = createFileRoute('/workitem/$workItemId')({
  component: WorkItemRouteComponent,
})

function WorkItemRouteComponent() {

    const { workItemId } = Route.useParams()
    const { data: workItem } = useQuery({
        queryKey: ['workItem', workItemId],
        queryFn: () => getWorkItem(parseInt(workItemId, 10)),
    })

    if (!workItem) return <p>Loading...</p>
    console.log(workItem);
    return (
        <div>
            <h2>{workItem.name}</h2>
            <p>{workItem.description}</p>
            <WorkItemDetailPage id={parseInt(workItemId, 10)} />
        </div>
    )
}

export default WorkItemRouteComponent;