/**
 * App Landing Page, this is the root '/' page, showing the checklist directory by default
 * 
 * The checklist directory was chosen as the landing page to provide users with immediate access to their tasks and checklists upon entering the application.
 * This design assumes users primarily enter the app through their checklists, and for now the app will not feature user management or authentication.
 * 
 * @updated Sep 2025
 * @author bling
 */

import ChecklistDirectory from "../features/checklist/components/directory"
import { createFileRoute } from "@tanstack/react-router"

export default function IndexPage() {
    return <ChecklistDirectory />
}

export const Route = createFileRoute('/')({ component: IndexPage })