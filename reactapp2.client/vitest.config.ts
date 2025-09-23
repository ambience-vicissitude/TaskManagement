import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// TODO: add test coverage

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,       // use global test(), expect()
        environment: 'jsdom', // simulate browser environment
        include: ['tests/**/*.{test,spec}.{ts,tsx}'], // which files to run

        // TODO: enable playwright when ready
        //browser: {
        //    enabled: true,
        //    provider: 'playwright',
        //    instances: [
        //        { browser: 'chromium' },
        //    ],
        //},
    },
})