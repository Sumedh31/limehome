import {test as baseTest } from '@playwright/test';
import { ApiSetup } from './api-setup';

export const test = baseTest.extend<{
    apiSetup: ApiSetup;
}>({
    // fixture for setup
    apiSetup: async ({ }, use) => {
        const apiSetup = new ApiSetup();;
        await use(apiSetup);
    },
});