import { expect, Locator, Page } from '@playwright/test';
import { Signup } from './signup';
import { SearchResults } from './search-results';

export class Home {
    // Locators for elements on the home page
    private signInButton: Locator;
    private searchInput: Locator;
    private searchSubmit: Locator;
    private page: Page;

    constructor(page: Page) {
        // Initialize locators for the home page elements

        // Most buttons in DOM are not using button role so we can't use getByRole
        this.signInButton = page.getByTitle('Log in to your customer account', { exact: true });
        this.searchInput = page.locator('[id="search_query_top"]');
        this.searchSubmit = page.locator('[name="submit_search"]');
        this.page = page;
    }

    // Clicks on the 'Sign In' button and navigates to the Signup page
    public async clickOnSignInButton(): Promise<Signup> {
        await this.signInButton.click();
        return new Signup(this.page);
    }

    // Enters a product name in the search input, presses Enter, and navigates to the SearchResults page
    public async searchForProduct(productName: string): Promise<SearchResults> {
        await this.searchInput.fill(productName);
        await this.page.keyboard.press('Enter');
        
        return new SearchResults(this.page);
    }
}
