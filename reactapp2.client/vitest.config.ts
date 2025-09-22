import { defineConfig } from 'vitest/config';
import plugin from '@vitejs/plugin-react';

// TODO: add test coverage

export default defineConfig({
    plugins: [plugin()],
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