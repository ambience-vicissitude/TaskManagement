/**
 * Checklist details
 * 
 * @updated Sep 2025
 * @author bling
 */

import { useQuery } from "@tanstack/react-query"
import { getChecklist } from "../api"
import WorkItemsDirectory from "./../../workitem/components/directory"

/**
 * ChecklistDetailPage
 * 
 * A component that shows the details of a checklist
 * 
 * @description the use of Checklist as a Prop Type is over-engineering
 * 
 * @param id checklist identifier
 * @returns render
 */
const ChecklistDetailPage: React.FC<{ id: number }> = ({ id }) => {
    const { data: checklist, isLoading, error } = useQuery({
        queryKey: ["checklist", id],
        queryFn: () => getChecklist(id),
    })

    if (isLoading) return <p>Loading checklist details...</p>
    else if (checklist) 
        return (
            <div>
                <h2>{checklist.name}</h2>
                <span>{checklist.description}</span>
                <WorkItemsDirectory checklistId={checklist.id} />
            </div>
        )
    else if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
    else return <p>No checklist found.</p>
}

export default ChecklistDetailPage;