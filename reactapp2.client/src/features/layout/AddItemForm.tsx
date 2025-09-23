/**
 * AddItemForm
 * 
 * A pure component serving as a form that adds items
 * those items could be checklists or work items
 * 
 * @updated Sep 2025
 * @author bling
 */

import React, { useState } from "react";

interface AddItemFormProps {
    title: string;
    checklistId?: number; // optional if creating a work item inside a checklist
    onCreate: (name: string, description: string, checklistId?: number) => void;
    pending?: boolean; // to disable the submit button while mutation is pending
    placeholderName?: string;
    placeholderDescription?: string;
}

/**
 * Add Item Form component
 * 
 * @param params
 * @returns rendering
 */
function AddItemForm({
    title,
    checklistId,
    onCreate,
    pending = false,
    placeholderName = "New item name",
    placeholderDescription = "New item description",
}: AddItemFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onCreate(name, description, checklistId);
        setName("");
        setDescription("");
    };

    return (

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h3 className="text-xl font-medium text-gray-700 mt-1 py-2">{title}</h3>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={placeholderName}
                className="border p-2 rounded"
            />
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={placeholderDescription}
                className="border p-2 rounded"
            />
            <button
                type="submit"
                disabled={pending}
                className="items-center gap-1 text-green-600 hover:text-green-800"
            >
                Add
            </button>
        </form>
    );
}

// Wrap in React.memo for pure component behavior
export default React.memo(AddItemForm) as typeof AddItemForm;
