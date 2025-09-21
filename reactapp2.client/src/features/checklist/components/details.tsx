

import { useQuery } from "@tanstack/react-query"
import { getChecklist } from "../api"
import WorkItemsDirectory from "./../../workitem/components/directory"
import type Checklist from "../model"

const ChecklistDetailPage: React.FC<Checklist> = ({ id }) => {

    const { data: checklist, isLoading, error } = useQuery({
        queryKey: ["checklist", id],
        queryFn: () => getChecklist(id),
    })

    if (isLoading) return <p>Loading checklist details...</p>
    else if (checklist) 
        return (
            <div>
                <h2>{checklist.name}</h2>
                <WorkItemsDirectory checklistId={checklist.id} />
            </div>
        )
    else if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
    else return <p>No checklist found.</p>
}

export default ChecklistDetailPage;