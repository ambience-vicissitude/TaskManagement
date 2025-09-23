import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// TODO: add test coverage

export default defineConfig({
    plugins: [react()],
    test: {
        browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
                { browser: 'chromium' },
            ],
        },
    },
})