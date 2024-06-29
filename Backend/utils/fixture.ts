import {test as baseTest } from '@playwright/test';
import { ApiSetup } from './api-setup';

export const test = baseTest.extend<{
    apiSetup: ApiSetup;
}>({
    /**
     * Fixture for setting up API-related functionality.
     * Provides an instance of ApiSetup configured with a base API context.
     */
    apiSetup: async ({ }, use) => {
        const apiSetup = new ApiSetup();;
        await use(apiSetup);
    },
});