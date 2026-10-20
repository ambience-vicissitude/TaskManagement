/**
 * Work Item API Tests
 * api.test.ts
 * 
 * Description: Unit tests for Work Item api calls
 * 
 * @updated Sep 2025
 * @author bling
 */
import { vi } from 'vitest';
import * as api from '../../../src/features/workitem/api';

describe('WorkItem API', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // Reset mocks before each test
    });

    // Helper to mock fetch responses
    const mockFetch = (ok: boolean, data: any) => {
        return vi.fn(() =>
            Promise.resolve({
                ok,
                json: () => Promise.resolve(data),
            } as Response)
        );
    };

    test('createWorkItem posts data and returns work item', async () => {
        const mockData = { id: 1, name: 'Task', description: 'Desc', isComplete: false };
        global.fetch = mockFetch(true, mockData) as any;

        const result = await api.createWorkItem({ name: 'Task', description: 'Desc', checklistId: 1 });
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('/api/workitem', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Task', description: 'Desc', checklistId: 1 }),
        }));
    });

    test('getWorkItems fetches by checklistId', async () => {
        const mockData = [{ id: 1, name: 'Task1' }];
        global.fetch = mockFetch(true, mockData) as any;

        const result = await api.getWorkItems(5);
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('/api/workitem?checklistId=5');
    });

    test('getWorkItem fetches by id', async () => {
        const mockData = { id: 1, name: 'Task' };
        global.fetch = mockFetch(true, mockData) as any;

        const result = await api.getWorkItem(1);
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('/api/workitem/1');
    });

    test('patchWorkItemAsCompleteOrIncomplete sends PATCH request', async () => {
        const mockData = { id: 1, isComplete: true };
        global.fetch = mockFetch(true, mockData) as any;

        const result = await api.patchWorkItemAsCompleteOrIncomplete(1, true);
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('/api/workitem/1?isComplete=true', { method: 'PATCH' });
    });

    test('updateWorkItem sends PUT request', async () => {
        const mockData = { id: 1, name: 'Updated' };
        global.fetch = mockFetch(true, mockData) as any;

        const result = await api.updateWorkItem(1, { name: 'Updated' });
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('/api/workitem/1', expect.objectContaining({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Updated' }),
        }));
    });

    test('deleteWorkItem sends DELETE request', async () => {
        const mockData = { success: true };
        global.fetch = mockFetch(true, mockData) as any;

        const result = await api.deleteWorkItem(1);
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('/api/workitem/1', { method: 'DELETE' });
    });

    test('throws error if response not ok', async () => {
        global.fetch = mockFetch(false, {}) as any;

        await expect(api.getWorkItem(99)).rejects.toThrow('Failed to fetch work item 99');
    });
});
