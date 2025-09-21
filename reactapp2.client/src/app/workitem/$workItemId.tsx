import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workitem/$workItemId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workitem/$workItemId"!</div>
}
