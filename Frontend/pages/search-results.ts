import { expect, Locator, Page } from '@playwright/test';
import exp from 'constants';
import { ProductDetails } from './product-details';

export class SearchResults {
    private products: Locator;
    private productAvailibilityIndicator: Locator;
    private moreButton: Locator;
    private listView: Locator;


    private page: Page;


    constructor(page: Page) {
        this.products = page.locator('[class="product-container"]');
        this.listView= page.locator('[id="list"] [class="icon-th-list"]'); 
        this.productAvailibilityIndicator = page.locator('[class="availability"]');
        this.moreButton = page.locator('a[class="button lnk_view btn btn-default"]');
        this.page = page;
    }

    public async getNumberOfProducts(): Promise<number> {
        const products = await this.products.count();
        return products;
    }

    public async getProductsFromResults() {
        const products = await this.products.all();
        return products;
    }

    public async ensureResultsAreDisplayed() {
        await this.listView.first().click();

        const products = await this.getProductsFromResults();        
        expect(products.length).toBeGreaterThan(0)
        await expect(this.products.first()).toBeVisible();
    }

    public async openFirstAvailableProduct() {
        const products = await this.getProductsFromResults();
        for (const product of products) {
            const productAvailibilityStatus = (await product.locator(this.productAvailibilityIndicator).innerText()).toLowerCase();
            if (productAvailibilityStatus.includes('in stock')|| productAvailibilityStatus.includes('product available with different options')) {
                await product.locator(this.moreButton).click();

                break;
            }            
        }

        const productDetailsPage = new ProductDetails(this.page);
        await productDetailsPage.verifyProductDetailsPage();
        return productDetailsPage;
    }
}