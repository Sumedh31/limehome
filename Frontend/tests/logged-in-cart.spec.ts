import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';

test.describe('Logged in user tests for cart checkout and cart edit', () => {
    test('User should be able to add products in cart as signed in user', async ({ setupWithNewUser, home }) => {
        // Search for product
        const searchResults = await home.searchForProduct('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Open first available product and add product to cart
        const productDetails = await searchResults.openFirstAvailableProduct();
        await productDetails.selectAvailableProductSize();
        await productDetails.addProductToCart();

        // Checkout
        const cartCheckOut = await productDetails.proceedToCheckout();
        await cartCheckOut.continueCheckout();
        await cartCheckOut.continueCheckoutAfterAddress();

        // Accept terms and conditions    
        await cartCheckOut.acceptTerms();
        await cartCheckOut.continueCheckoutAfterShipping();

        // Make payment by bank wire
        await cartCheckOut.payByBankWire();
        await cartCheckOut.confirmOrder();
        const orderReference = await cartCheckOut.getOrderDetails();

        // Verify order placed successfully
        await cartCheckOut.navigateToOrderHistory();
        await cartCheckOut.verifyOrderPlacedSuccessfully(orderReference);
    });

    test('A Signed in user should be able to edit the cart', async ({setupWithNewUser, home}) => { 
        // Search for product
        const searchResults = await home.searchForProduct('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Open first available product and add products to cart
        const productDetails = await searchResults.openFirstAvailableProduct();
        await productDetails.selectAvailableProductSize();
        await productDetails.addProductToCart();
        await productDetails.continueShopping();

        const cartCheckOut = await productDetails.viewShoppingCart();
        const initialCartPrice = await cartCheckOut.getTotalCartPrice();

        const afterEditCartPrice = await cartCheckOut.editOrder();
        expect(afterEditCartPrice).not.toEqual(initialCartPrice);
    });
});
