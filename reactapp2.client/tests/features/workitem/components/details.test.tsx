/**
 * Work Item Detail Page Tests
 * details.test.tsx
 * 
 * Description: Unit tests for WorkItemDetailPage component
 * 
 * Remarks: these tests were written in a rush to cover basic functionality.
 * Ideally I had hoped to mock as little as possible, hence this component itself had only a few responsbilities and then delegated displaying to WorkItemDetail.
 * 
 * @updated Sep 2025
 * @author bling
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import WorkItemDetailPage from '../../../../src/features/workitem/components/details';
import * as api from '../../../../src/features/workitem/api'; // import the getWorkItem function to mock

// Create a mock router (simplified)
const mockRouter = {
    history: {
        back: vi.fn(),
    },
};
vi.mock('@tanstack/react-router', () => ({
    useRouter: () => mockRouter,
}));

describe('WorkItemDetailPage', () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false }, // turn off retries
        },
    });

    beforeEach(() => {
        queryClient.clear();
        vi.restoreAllMocks();
    });

    test('shows loading state', () => {
        vi.spyOn(api, 'getWorkItem').mockImplementation(() => new Promise(() => { })); // never resolves
        render(
            <QueryClientProvider client={queryClient}>
                <WorkItemDetailPage id={1} />
            </QueryClientProvider>
        );

        expect(screen.getByText(/Loading work item details/i)).toBeInTheDocument();
    });

    test('renders work item details when query succeeds', async () => {
        const mockData = {
            id: 1,
            name: 'Test Task',
            description: 'This is a test task',
            isComplete: false,
        };
        vi.spyOn(api, 'getWorkItem').mockResolvedValue(mockData);

        render(
            <QueryClientProvider client={queryClient}>
                <WorkItemDetailPage id={1} />
            </QueryClientProvider>
        );

        // Wait for async rendering
        await waitFor(() => {
            expect(screen.getByText('Test Task')).toBeInTheDocument();
            expect(screen.getByText('This is a test task')).toBeInTheDocument();
            expect(screen.getByText(/Todo\/Doing/i)).toBeInTheDocument();
        });
    });

    test('renders error state when query fails', async () => {
        vi.spyOn(api, 'getWorkItem').mockRejectedValue(new Error('Failed to fetch'));

        render(
            <QueryClientProvider client={queryClient}>
                <WorkItemDetailPage id={1} />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
        });
    });

    test('calls router.back on back button click', async () => {
        const mockData = {
            id: 1,
            name: 'Test Task',
            description: 'This is a test task',
            isComplete: false,
        };
        vi.spyOn(api, 'getWorkItem').mockResolvedValue(mockData);

        render(
            <QueryClientProvider client={queryClient}>
                <WorkItemDetailPage id={1} />
            </QueryClientProvider>
        );

        const user = userEvent.setup();

        // Wait for component to render the work item
        await waitFor(() => screen.getByRole('button', { name: /back/i }));

        const backButton = screen.getByRole('button', { name: /back/i });
        await user.click(backButton);

        expect(mockRouter.history.back).toHaveBeenCalledTimes(1);
    });
});
