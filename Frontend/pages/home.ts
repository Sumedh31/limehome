import { expect, Locator, Page } from '@playwright/test';
import { Signup } from './signup';
import { SearchResults } from './search-results';

export class Home {
    // Locators for elements on the home page
    private signInButton: Locator;
    private searchInput: Locator;
    private searchSubmit: Locator;
    private searchSuggestions: Locator;
    private page: Page;

    constructor(page: Page) {
        // Initialize locators for the home page elements

        // Most buttons in DOM are not using button role so we can't use getByRole
        this.signInButton = page.getByTitle('Log in to your customer account', { exact: true });
        this.searchInput = page.locator('[id="search_query_top"]');
        this.searchSubmit = page.locator('[name="submit_search"]');
        this.searchSuggestions = page.locator('[class="ac_results"]');
        this.page = page;
    }

    // Clicks on the 'Sign In' button and navigates to the Signup page
    public async clickOnSignInButton(): Promise<Signup> {
        await this.signInButton.click();
        return new Signup(this.page);
    }

    // Searches for a product by entering a product name in the search input
    public async searchForProduct(productName: string){
        /**
         Types each character of the productName into the search input. Using `press` instead of `fill` because 
         filling in the search input with the full keyword does not trigger suggestions, requiring individual character simulation. */
        for (const char of productName.split('')) {
            await this.searchInput.press(char);
        }
    }

    // Enters a product name in the search input, presses Enter, and navigates to the SearchResults page
    public async searchForProductAndSubmit(productName: string): Promise<SearchResults> {
        await this.searchInput.fill(productName);
        await this.searchSubmit.click();
        
        return new SearchResults(this.page);
    }

    // Verifies that relevant search suggestions are displayed
    public async verifyRelevantSearchSuggestionsDisplayed(keyword: string) {
        const searchSuggestions = (await this.searchSuggestions.innerText()).toLowerCase();
        expect(searchSuggestions).toContain(keyword);
    }
}
