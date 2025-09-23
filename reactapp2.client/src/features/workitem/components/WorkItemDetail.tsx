/**
 * WorkItemDetail component
 * 
 * @updated Sep 2025
 * @author bling
 */
import React from 'react';
import type WorkItem from '../model';
interface WorkItemDetailProps {
    workItem: WorkItem;
    category?: string;
    dueDate?: string;
    onBack?: () => void;
}

function WorkItemDetail({
    workItem,
    category,
    dueDate,
    onBack,
}: WorkItemDetailProps) {
    return (
        <div className="p-4 rounded-2xl shadow bg-white max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mt-2">{workItem.name}</h2>
            {workItem.description && <p className="text-base text-gray-600 mt-1">{workItem.description}</p>}

            <p className="mb-2">
                Status:{" "}
                <span
                    className={
                        workItem.isComplete ? "text-green-600 font-semibold" : "text-yellow-600"
                    }
                >
                    {workItem.isComplete ? "Completed" : "Todo/Doing"}
                </span>
            </p>

            {category && (
                <p className="mb-4 text-gray-500">Category: {category}</p>
            )}
            {dueDate && (
                <p className="mb-4 text-gray-500">Due: {new Date(dueDate).toDateString()}</p>
            )}

            <button
                onClick={onBack}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 my-2"
            >
                &larr; Back
            </button>
        </div>
    );
}

export default React.memo(WorkItemDetail) as typeof WorkItemDetail;