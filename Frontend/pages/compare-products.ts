import { expect, Locator, Page } from '@playwright/test';

export class CompareProducts {
    private priceContainer: Locator;

    constructor(page: Page) {
        // Initialize locators for signup form
        this.priceContainer = page.locator('[id="product_comparison"] [class="price product-price"]');
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

    public async verifyProductPricesMatch(firstProductPrice: string, secondProductPrice: string): Promise<void> {
        await expect(this.priceContainer.first()).toBeVisible();
        const prices = await this.priceContainer.all();

        await expect(prices[0]).toBeVisible();
        await expect(prices[1]).toBeVisible();

        const firstProductPriceText = await prices[0].innerText();
        const secondProductPriceText = await prices[1].innerText();
        expect(firstProductPriceText).toContain(firstProductPrice);
        expect(secondProductPriceText).toContain(secondProductPrice);
    }
}