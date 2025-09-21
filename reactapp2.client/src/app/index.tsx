import WorkItemDirectory from "../features/checklist/components/directory"
import { createFileRoute } from "@tanstack/react-router"

export default function IndexPage() {
    return <WorkItemDirectory />
}

export const Route = createFileRoute('/')({ component: IndexPage })