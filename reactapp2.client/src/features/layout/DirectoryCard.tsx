/**
 * DirectoryCard component
 * 
 * A pure component for rendering a card
 * 
 * @updated Sep 2025
 * @author bling
 */

import React from "react";
import { Check, Trash2, Edit, RefreshCw } from "lucide-react";
import type Checklist from "../checklist/model";
import type WorkItem from "../workitem/model";

interface DirectoryCardProps {
    item: WorkItem | Checklist;
    completed?: number;
    total?: number;
    onClick: (id: number) => void;
    onComplete?: (id: number, isComplete: boolean) => void;
    onEdit?: () => void;
    onDelete?: (id: number) => void;
}

/**
 * A Directory Card
 * 
 * The responsibility of this component is to display what it is given
 * without necessarily caring about the business/domain it is displaying
 * 
 * It supports workitem and checklist
 * 
 * @param params item to show and event handlers
 * @returns rendering
 */
function DirectoryCard({
    item,
    completed,
    total,
    onClick,
    onComplete,
    onEdit,
    onDelete,
}: DirectoryCardProps) {
    return (
        <div
            className="rounded-2xl shadow p-4 bg-white hover:bg-gray-50 cursor-pointer flex flex-col gap-2"
            onClick={() => onClick(item.id)}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                </div>
                {typeof completed === "number" && typeof total === "number" && (
                    <span className="text-sm text-gray-600">
                        {completed} / {total}
                    </span>
                )}
            </div>

            {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            )}

            <div className="flex gap-2 mt-2">
                {onComplete && !item.isComplete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onComplete?.(item.id, true);
                        }}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    >
                        <Check size={16} /> Mark as Completed
                    </button>
                )}
                {onComplete && item.isComplete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onComplete?.(item.id, false);
                        }}
                        className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800"
                    >
                        <RefreshCw size={16} /> Undo completion
                    </button>
                )}
                {onEdit && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                        <Edit size={16} /> Edit
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                        }}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                )}
            </div>
        </div>
    );
}

// React.memoized to avoid unnecessary re-renders
export default React.memo(DirectoryCard) as typeof DirectoryCard;
