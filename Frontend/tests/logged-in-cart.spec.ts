import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';

// Test suite for logged-in user operations related to cart checkout and cart editing
test.describe('Logged in user tests for cart checkout and cart edit', () => {

    // Test to verify that a user can add products to the cart and complete the checkout process
    test('User should be able to add products in cart as signed in user', async ({ setupWithNewUser, home }) => {

        // Step 1: Search for product
        const searchResults = await home.searchForProductAndSubmit('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Step 2: Open first available product and add it to the cart
        const productDetails = await searchResults.openFirstAvailableProduct();
        await productDetails.selectAvailableProductSize();
        await productDetails.addProductToCart();

        // Step 3: Proceed to checkout
        const cartCheckOut = await productDetails.proceedToCheckout();
        await cartCheckOut.continueCheckout();
        await cartCheckOut.continueCheckoutAfterAddress();

        // Step 4: Accept terms and conditions and continue checkout
        await cartCheckOut.acceptTerms();
        await cartCheckOut.continueCheckoutAfterShipping();

        // Step 5: Make payment by bank wire and confirm order
        await cartCheckOut.payByBankWire();
        await cartCheckOut.confirmOrder();
        const orderReference = await cartCheckOut.getOrderDetails();

        // Step 6: Verify the order was placed successfully
        await cartCheckOut.navigateToOrderHistory();
        await cartCheckOut.verifyOrderPlacedSuccessfully(orderReference);
    });

    // Test to verify that a signed-in user can edit the cart
    test('A signed-in user should be able to edit the cart', async ({ setupWithNewUser, home }) => {

        // Step 1: Search for product
        const searchResults = await home.searchForProductAndSubmit('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Step 2: Open first available product and add it to the cart
        const productDetails = await searchResults.openFirstAvailableProduct();
        await productDetails.selectAvailableProductSize();
        await productDetails.addProductToCart();
        await productDetails.continueShopping();

        // Step 3: View the shopping cart and capture the initial cart price
        const cartCheckOut = await productDetails.viewShoppingCart();
        const initialCartPrice = await cartCheckOut.getTotalCartPrice();

        // Step 4: Edit the order in the cart and verify the cart price changes
        const afterEditCartPrice = await cartCheckOut.editOrder();
        expect(afterEditCartPrice).not.toEqual(initialCartPrice);
    });
});
