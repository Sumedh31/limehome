import { Locator, Page, expect } from '@playwright/test';
import { CartCheckout } from './cart-checkout';

export class ProductDetails {
    private addToCart: Locator;
    private addedToCart: Locator;
    private productAvailibility: Locator;
    private productSizeSelect: Locator;
    private proceedToCheckoutButton: Locator;
    private productPrice: Locator;
    private continueShoppingButton: Locator;
    private viewShoppingCartButton: Locator;

    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.productSizeSelect = page.locator('select[name="group_1"]');
        this.productAvailibility = page.locator('[id="availability_value"]');
        this.addToCart = page.locator('[id="add_to_cart"]');
        this.addedToCart = page.locator('[id="add_to_cart"] [class="exclusive added"]');
        this.proceedToCheckoutButton = page.getByTitle('Proceed to checkout');
        this.productPrice = page.locator('[id="our_price_display"]');
        this.continueShoppingButton = page.getByTitle('Continue shopping');
        this.viewShoppingCartButton = page.getByTitle('View my shopping cart');
    }

    // Verify if the product details page is loaded correctly
    public async verifyProductDetailsPage() {
        await expect(this.productPrice).toBeVisible();
    }

    // Select an available product size
    public async selectAvailableProductSize() {
        for (let i = 1; i < 4; i++) {
            let productAvailibilityStatus = (await this.productAvailibility.innerText()).toLowerCase();
            if (!(productAvailibilityStatus === 'in stock')) {
                await this.productSizeSelect.selectOption({ value: `${i}` });

                /*
                ToDo: Two consecutive sizes might display the same availability status, so we can't rely on waiting for the status to change. Selecting a size 
                without waiting can sometimes be too quick, causing the Add to Cart button to not load properly even when sizes are available. This was 
                causing test to become flaky. Therefore, a wait has been added as a temporary solution.
                */
                await this.page.waitForTimeout(500);
            } else {
                return;
            }
        }
    }

    // Add the selected product to the cart
    public async addProductToCart() {
        await this.addToCart.click();

        // Ensure that the product has been added to the cart 
        await expect(this.addedToCart).toBeVisible();
    }

    // Proceed to the checkout page
    public async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
        return new CartCheckout(this.page);
    }

    // Continue shopping after adding the product to the cart
    public async continueShopping() {
        await this.continueShoppingButton.click();
    }

    // View the shopping cart
    public async viewShoppingCart() {
        await this.viewShoppingCartButton.click();
        return new CartCheckout(this.page);
    }
}
