import { test } from '../utils/fixtures';

test.describe('Complete checkout as logged in user', () => {
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
});
