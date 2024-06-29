import {test as baseTest } from '@playwright/test';
import { SetupApp } from './setup-app';

export const test = baseTest.extend<{
    setup: SetupApp;
}>({
    // fixture for setup
    setup: async ({ page }, use) => {
        const setup = new SetupApp(page);
        await setup.setup();
        await use(setup);
    },
});
