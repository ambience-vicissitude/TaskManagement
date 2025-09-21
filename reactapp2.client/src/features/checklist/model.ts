/**
 * Checklist Model File
 * - responsible for checklist domain model
 * 
 * @updated Sep 2025
 * @author bling
 */

import type WorkItem from "../workitem/model"

export default interface Checklist {
    id: number;
    name: string;
    description: string;
    items: WorkItem[];
    isComplete: boolean;
    isDeleted: boolean;
    deletedAt: Date | null;
}
