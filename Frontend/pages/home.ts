import { expect, Locator, Page } from '@playwright/test';
import { Signup } from './signup';
import { SearchResults } from './search-results';

export class Home {
    private signInButton: Locator;
    private searchInput: Locator;
    private searchSubmit: Locator;
    private page: Page;


    constructor(page: Page) {
        // Most buttons in DOM are not using button role so we can't use getByRole
        this.signInButton = page.getByTitle('Log in to your customer account', {exact: true});
        this.searchInput = page.locator('[id="search_query_top"]');   
        this.searchSubmit = page.locator('[name="submit_search"]'); 
        this.page = page;
    }

    public async clickOnSignInButton() {
        await this.signInButton.click();
        return new Signup(this.page);
    }

    public async searchForProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.page.keyboard.press('Enter');
        
        return new SearchResults(this.page);
    }
}