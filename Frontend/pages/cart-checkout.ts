import { Locator, Page, expect } from '@playwright/test';

export class CartCheckout {
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


    private page: Page;


    constructor(page: Page) {
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
        this.page = page;
    }

    public async continueCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    public async acceptTerms() {
        await this.acceptTermsCheckbox.click();
    }

    public async payByBankWire() {
        await this.payByBankWireButton.click();
    }

    public async confirmOrder() {
        await this.confirmOrderButton.click();

    }

    public async getOrderDetails() {
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

    public async navigateToOrderHistory() {
        await this.orderHistoryButton.click();
    }

    public async verifyOrderPlacedSuccessfully(orderReference: string) {
        const orders = await this.orderList.innerText();
        await expect(this.firstOrderFromHistory).toBeVisible();
        await expect(orders).toContain(orderReference);
    }

    public async continueCheckoutAfterAddress() {
        await this.proceedCheckoutAfterAddress.click();
    }

    public async continueCheckoutAfterShipping() {
        await this.proceedCheckoutAfterShipping.click();
    }
}