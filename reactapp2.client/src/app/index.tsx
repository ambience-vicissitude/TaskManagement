import ChecklistDirectory from "../features/checklist/components/directory"
import { createFileRoute } from "@tanstack/react-router"

export default function IndexPage() {
    return <ChecklistDirectory />
}

export const Route = createFileRoute('/')({ component: IndexPage })