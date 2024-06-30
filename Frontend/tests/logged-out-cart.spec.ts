import { test } from '../utils/fixtures';

test.describe('Complete checkout as guest user by signing up', () => {
  test('User should be able to add products in cart', async ({ setup, home, signup }) => {

    // Search for product
    const searchResults = await home.searchForProduct('dresses');
    await searchResults.ensureResultsAreDisplayed();

    // Open first available product and add product to cart
    const productDetails = await searchResults.openFirstAvailableProduct();
    await productDetails.selectAvailableProductSize();
    await productDetails.addProductToCart();

    // Checkout as guest user
    const cartCheckOut = await productDetails.proceedToCheckout();
    await cartCheckOut.continueCheckout();

    // Sign up before continuing to checkout
    await signup.registerUser();
    await signup.fillAddressDetails();
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
