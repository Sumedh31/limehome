import { expect, Locator, Page } from '@playwright/test';
import { generateRandomEmail, generateRandomFirstName, generateRandomLastName, generateRandomPassword } from '../utils/helper';

export class CompareProducts {
    private priceContainer: Locator;

    constructor(page: Page) {
        // Initialize locators for signup form
        this.priceContainer = page.locator('[id="product_comparison"] [class="prices-container"]');
    }

    // Verify that the compare page is displayed and the correct number of products are shown
    public async verifyCorrectNumberOfProductsInCompare(expectedNumberOfProducts: number): Promise<void> {
        expect.poll(async () => {
            const productsInComparison = await this.priceContainer.count();
            if (productsInComparison === expectedNumberOfProducts) {
                return;
            } else {
                throw new Error(`Expected ${expectedNumberOfProducts} products in comparison, but found ${productsInComparison}`);
            }
        }, {
            timeout: 5000, // Timeout in milliseconds
            message: `Timed out waiting for ${expectedNumberOfProducts} products in comparison`
        });
    }
}