import { useEffect, useState } from 'react';
import './App.css';

interface WorkItem {
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
interface Checklist {
    id: number;
    name: string;
    description: string;
    items: WorkItem[];
    isComplete: boolean;
    isDeleted: boolean;
    deletedAt: Date | null;
}

// 2. Keep a runtime-safe list of keys (typed to Todo)
const checklistKeys: (keyof Checklist)[] = ["id", "name", "description", "items", "isComplete", "isDeleted", "deletedAt"];

const userLocale = navigator.language;
const capitalizeLocale = (input: string, locale: string): string => {
    if (!input) return '';
    return input[0].toLocaleUpperCase(locale) + input.slice(1).toLocaleLowerCase(locale);
}


function ChecklistApp() {
    const [checklists, setChecklists] = useState<Checklist[]>();

    useEffect(() => {
        populateChecklists();
    }, []);

    // 3. Method to render table headers
    const renderHeaders = () => {
        return (
            <tr>
                {checklistKeys.map((key) => (
                    <th key={key}>{capitalizeLocale(key, userLocale)}</th>
                ))}
            </tr>
        );
    };

    const contents = checklists === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>{renderHeaders()}</thead>
            <tbody>
                {checklists.map((checklist) => (
                    <tr key={`checklist-${checklist.Id}`}>
                        {checklistKeys.map((key) => (
                            <td key={key.toString()}>{String(checklist[key])}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">My Checklists</h1>
            <p>This component demonstrates fetching checklists from the server.</p>
            {contents}
        </div>
    );

    async function populateChecklists() {
        const response = await fetch('/api/checklist');
        if (response.ok) {
            const data = await response.json();
            setChecklists(data);
        }
    }
}

export default ChecklistApp;