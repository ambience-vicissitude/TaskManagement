/**
 * Work Item details
 * 
 * @updated Sep 2025
 * @author bling
 */

import { useQuery } from "@tanstack/react-query"
import { getWorkItem } from "../api"
import { useRouter } from "@tanstack/react-router";
import WorkItemDetail from "./WorkItemDetail";

/**
 * WorkItemDetailPage
 * 
 * A component that shows the details of a work item
 * 
 * @description the use of WorkItem as a Prop Type is over-engineering
 * 
 * @param id work item identifier
 * @returns render
 */
const WorkItemDetailPage: React.FC<{ id: number }> = ({ id }) => {
    const router = useRouter();
    const { data: workItem, isLoading, error } = useQuery({
        queryKey: ["workItem", id],
        queryFn: () => getWorkItem(id),
    })

    if (isLoading) return <p>Loading work item details...</p>
    else if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
    else if (workItem) return (
        <WorkItemDetail
            workItem={workItem}
            category="work related" // hardcoded for now
            dueDate={new Date().toDateString()} // hardcoded for now
            onBack={() => router.history.back()} // is not bulletproof but reliable in most cases
        />
    )
    else return <p>No work item found.</p>
}

export default WorkItemDetailPage;