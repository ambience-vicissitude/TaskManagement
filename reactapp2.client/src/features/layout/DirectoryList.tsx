/**
 * DirectoryList component
 * 
 * A pure component for rendering a directory
 * 
 * @updated Sep 2025
 * @author bling
 */
import React from "react";
import DirectoryCard from "./DirectoryCard";
import type WorkItem from "../workitem/model";
import type Checklist from "../checklist/model";

interface DirectoryListProps {
    items: (WorkItem | Checklist)[];
    onCardClick?: (id: number) => void;
    onToggleComplete?: (id: number, isComplete: boolean) => void;
    onDelete?: (id: number) => void;
}

/**
 * A Directory list
 * 
 * The responsibility of this component is to display what it is given
 * without necessarily caring about the business/domain it is displaying
 * 
 * It supports workitems and checklists
 * 
 * @param params items to list and event handlers
 * @returns rendering
 */
function DirectoryList({ items, onCardClick, onToggleComplete, onDelete }: DirectoryListProps) {
    return (
        <>
            <div className="grid gap-4">
                Completed: {items.filter(item => item.isComplete).length} / {items.length}
            </div>
            <div className="grid gap-4">
                {items.map((item) => (
                    <DirectoryCard
                        key={item.id}
                        item={item}
                        onClick={() => onCardClick?.(item.id)}
                        onComplete={onToggleComplete}
                        onEdit={() => console.log("Edit", item.id)}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}

// React.memoized to avoid unnecessary re-renders
export default React.memo(DirectoryList) as typeof DirectoryList;
