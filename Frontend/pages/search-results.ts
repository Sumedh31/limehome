import { expect, Locator, Page } from '@playwright/test';
import { ProductDetails } from './product-details';

export class SearchResults {
    private products: Locator;
    private productAvailabilityIndicator: Locator;
    private moreButton: Locator;
    private listView: Locator;
    private page: Page;

    constructor(page: Page) {
        // Initialize locators
        this.products = page.locator('[class="product-container"]');
        this.listView = page.locator('[id="list"] [class="icon-th-list"]');
        this.productAvailabilityIndicator = page.locator('[class="availability"]');
        this.moreButton = page.locator('a[class="button lnk_view btn btn-default"]');
        this.page = page;
    }

    // Get the number of products displayed
    public async getNumberOfProducts(): Promise<number> {
        const productsCount = await this.products.count();
        return productsCount;
    }

    // Get all product elements from the search results
    public async getProductsFromResults() {
        const products = await this.products.all();
        return products;
    }

    // Ensure that search results are displayed and accessible
    public async ensureResultsAreDisplayed() {
        // Switch to list view for better visibility
        await this.listView.first().click();

        // Get all products and verify at least one is visible
        const products = await this.getProductsFromResults();
        expect(products.length).toBeGreaterThan(0);
        await expect(this.products.first()).toBeVisible();
    }

    // Open the first available product that is in stock or has options available
    public async openFirstAvailableProduct(): Promise<ProductDetails> {
        const products = await this.getProductsFromResults();
        for (const product of products) {
            const productAvailabilityStatus = (await product.locator(this.productAvailabilityIndicator).innerText()).toLowerCase();
            if (productAvailabilityStatus.includes('in stock') || productAvailabilityStatus.includes('product available with different options')) {
                // Click on the 'More' button to view product details and break the loop as soon as a product is found
                await product.locator(this.moreButton).click();
                break;
            }
        }

        // Instantiate and return ProductDetails page
        const productDetailsPage = new ProductDetails(this.page);
        await productDetailsPage.verifyProductDetailsPage();
        return productDetailsPage;
    }
}
