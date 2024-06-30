import { test } from '../utils/fixtures';

// Test suite for completing checkout as a guest user by signing up
test.describe('Complete checkout as guest user by signing up', () => {
    
    // Test to verify that a guest user can add products to the cart and complete the checkout process by signing up
    test('Logged out user should be able to add products in cart and complete checkout by signing up', async ({ setup, home, signup }) => {

        // Step 1: Search for product
        const searchResults = await home.searchForProduct('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Step 2: Open first available product and add it to the cart
        const productDetails = await searchResults.openFirstAvailableProduct();
        await productDetails.selectAvailableProductSize();
        await productDetails.addProductToCart();

        // Step 3: Proceed to checkout as a guest user
        const cartCheckOut = await productDetails.proceedToCheckout();
        await cartCheckOut.continueCheckout();

        // Step 4: Sign up before continuing to checkout
        await signup.registerUser();
        await signup.fillAddressDetails();
        await cartCheckOut.continueCheckoutAfterAddress();

        // Step 5: Accept terms and conditions and continue checkout
        await cartCheckOut.acceptTerms();
        await cartCheckOut.continueCheckoutAfterShipping();

        // Step 6: Make payment by bank wire and confirm order
        await cartCheckOut.payByBankWire();
        await cartCheckOut.confirmOrder();
        const orderReference = await cartCheckOut.getOrderDetails();

        // Step 7: Verify the order was placed successfully
        await cartCheckOut.navigateToOrderHistory();
        await cartCheckOut.verifyOrderPlacedSuccessfully(orderReference);
    });
});
