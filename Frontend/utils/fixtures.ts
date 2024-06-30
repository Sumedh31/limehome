import {test as baseTest } from '@playwright/test';
import { SetupApp } from './setup-app';
import { Home } from '../pages/home';
import { SearchResults } from '../pages/search-results';
import { Signup } from '../pages/signup';

export const test = baseTest.extend<{
    setup: SetupApp;
    setupWithNewUser: SetupApp;
    home: Home;
    searchResults: SearchResults;
    signup: Signup;
}>({
    // fixture for setup
    setup: async ({ page }, use) => {
        const setup = new SetupApp(page);
        await setup.setup();
        await use(setup);

        // TearDown: Close the browser after the test
        await page.close();


    },

    setupWithNewUser: async ({ page, home }, use) => {
        const setup = new SetupApp(page);
        await setup.setup();
        const signUp = await home.clickOnSignInButton();
        await signUp.registerNewUser();
        await use(setup);

        // TearDown: Close the browser after the test
        await page.close();
    },

    // fixture for home page
    home: async ({ page, setup }, use) => {
        const home = new Home(page);
        await use(home);
    },

    // fixture for search results
    searchResults: async ({ page }, use) => {
        const searchResults = new SearchResults(page);
        await use(searchResults);
    },

    // fixture for signup
    signup: async ({ page }, use) => {
        const signup = new Signup(page);
        await use(signup);
    },
});
