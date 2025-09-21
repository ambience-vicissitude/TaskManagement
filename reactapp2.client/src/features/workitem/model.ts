/**
 * WorkItem Model File
 * - responsible for workitem domain model
 * 
 * @updated Sep 2025
 * @author bling
 */

export default interface WorkItem {
    id: number;
    name: string;
    description: string;
    dueDate: Date | null;
    isComplete: boolean;
    isDeleted: boolean;
    deletedAt: Date | null;
    assignedTo: string | null;
    priority: string | null;
    category: string | null;
}
