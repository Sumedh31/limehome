import { Locator, Page, expect } from '@playwright/test';

export class CartCheckout {
    // Locators for checkout steps
    private proceedToCheckoutButton: Locator;
    private proceedCheckoutAfterAddress: Locator;
    private proceedCheckoutAfterShipping: Locator;
    private acceptTermsCheckbox: Locator;
    private payByBankWireButton: Locator;
    private confirmOrderButton: Locator;
    private orderHistoryButton: Locator;
    private orderConfirmationMessage: Locator;
    private firstOrderFromHistory: Locator;
    private orderList: Locator;
    private totalCartPrice: Locator;

    // Locators for order editing
    private subtractOrder: Locator;
    private addOrder: Locator;

    private page: Page;

    constructor(page: Page) {
        // Initialize locators for checkout steps
        this.proceedToCheckoutButton = page.locator('[class="cart_navigation clearfix"] [title="Proceed to checkout"]');
        this.proceedCheckoutAfterAddress = page.locator('[name="processAddress"]');
        this.proceedCheckoutAfterShipping = page.locator('[name="processCarrier"]');
        this.acceptTermsCheckbox = page.locator('[id="uniform-cgv"]');
        this.payByBankWireButton = page.getByTitle('Pay by bank wire');
        this.confirmOrderButton = page.locator('[id="cart_navigation"] button[type="submit"]');
        this.orderHistoryButton = page.getByTitle('Go to your order history page');
        this.orderConfirmationMessage = page.locator('[class="box"]');
        this.firstOrderFromHistory = page.locator('[id="order-list"] [class="first_item "]');
        this.orderList = page.locator('[id="order-list"]');
        this.totalCartPrice = page.locator('[id="total_price"]');

        // Initialize locators for order editing
        this.subtractOrder = page.getByTitle('Subtract');
        this.addOrder = page.getByTitle('Add');

        this.page = page;
    }

    // Clicks on the 'Proceed to checkout' button
    public async continueCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    // Clicks on the 'I agree to the terms of service' checkbox
    public async acceptTerms() {
        await this.acceptTermsCheckbox.click();
    }

    // Clicks on the 'Pay by bank wire' button
    public async payByBankWire() {
        await this.payByBankWireButton.click();
    }

    // Clicks on the 'Confirm Order' button
    public async confirmOrder() {
        await this.confirmOrderButton.click();
    }

    // Retrieves the order reference from the order confirmation message
    public async getOrderDetails(): Promise<string> {
        let orderReference = '';
        const orderDetails = await this.orderConfirmationMessage.innerText();
        // Regular expression to match the order reference
        const orderReferencePattern = /order reference (\w+)/;

        // Execute the regex on the innerText
        const match = orderDetails.match(orderReferencePattern);
        if (match && match[1]) {
            orderReference = match[1];
        }
        expect(orderReference).not.toEqual('');
        return orderReference;
    }

    // Clicks on the 'Go to your order history page' button
    public async navigateToOrderHistory() {
        await this.orderHistoryButton.click();
    }

    // Verifies if the order was placed successfully by checking the order history
    public async verifyOrderPlacedSuccessfully(orderReference: string) {
        const orders = await this.orderList.innerText();
        await expect(this.firstOrderFromHistory).toBeVisible();
        await expect(orders).toContain(orderReference);
    }

    // Clicks on the 'Proceed to checkout' button after entering address details
    public async continueCheckoutAfterAddress() {
        await this.proceedCheckoutAfterAddress.click();
    }

    // Clicks on the 'Proceed to checkout' button after selecting shipping options
    public async continueCheckoutAfterShipping() {
        await this.proceedCheckoutAfterShipping.click();
    }

    // Retrieves the total cart price as a number
    public async getTotalCartPrice(): Promise<number> {
        const totalCartPrice = await this.totalCartPrice.innerText();
        return parseFloat(totalCartPrice.replace('$', ''));
    }

    // Edits the order in the cart by adding and subtracting items and verifies the cart price changes
    public async editOrder(): Promise<number> {
        // Execution sometime fails due to slow network hence using waitForResponse for stability
        await this.page.waitForResponse(async (response) => response.status() === 200, {timeout: 10000});
        let cartPrice = await this.getTotalCartPrice();

        // Add two items to the cart
        await this.addOrder.first().click();
        await this.addOrder.first().click();

        // Polling to verify the cart price increases
        await expect.poll(async () => await this.getTotalCartPrice(), {
            timeout: 5000, // Time to wait before failing the test (in milliseconds)
            message: 'Expected the total cart price to be greater than the specified cart price',
        }).toBeGreaterThan(cartPrice);

        cartPrice = await this.getTotalCartPrice();

        // Subtract one item from the cart
        await this.subtractOrder.first().click();

        // Polling to verify the cart price decreases
        await expect.poll(async () => await this.getTotalCartPrice(), {
            timeout: 5000, // Time to wait before failing the test (in milliseconds)
            message: 'Expected the total cart price to be less than the specified cart price',
        }).toBeLessThan(cartPrice);

        return cartPrice;
    }
}
