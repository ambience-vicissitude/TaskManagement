/**
 * Work Item Detail Tests
 * WorkItemDetail.test.tsx
 * 
 * Description: Unit tests for WorkItemDetail component
 * 
 * @updated Sep 2025
 * @author bling
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; // one-liner, no setup file needed
import WorkItemDetail from '../../../../src/features/workitem/components/WorkItemDetail';

// Mock work item
const mockWorkItem = {
    id: '1',
    name: 'Test Task',
    description: 'This is a test description',
    isComplete: false,
};

describe('WorkItemDetail Component', () => {
    test('renders work item name and description', () => {
        render(<WorkItemDetail workItem={ mockWorkItem } />);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('This is a test description')).toBeInTheDocument();
    });

    test('renders status correctly based on isComplete', () => {
        const { rerender } = render(<WorkItemDetail workItem={{ ...mockWorkItem, isComplete: false }} />);
        expect(screen.getByText('Todo/Doing')).toBeInTheDocument();

        rerender(<WorkItemDetail workItem={{ ...mockWorkItem, isComplete: true }} />);
        expect(screen.getByText('Completed')).toBeInTheDocument();
     });

    test('renders optional category and dueDate', () => {
        render(
            <WorkItemDetail
                workItem={ mockWorkItem }
                category = "Urgent"
            />
        );

        expect(screen.getByText('Category: Urgent')).toBeInTheDocument();
    });

    test('calls onBack when back button is clicked', async () => {
        const user = userEvent.setup();
        const onBackMock = vi.fn();

        render(<WorkItemDetail workItem={ mockWorkItem } onBack = { onBackMock } />);

        const backButton = screen.getByRole('button', { name: /back/i });
        await user.click(backButton);

        expect(onBackMock).toHaveBeenCalledTimes(1);
    });
});
