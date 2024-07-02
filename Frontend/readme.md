# Checkout Process Test Suite

This test suite is designed to validate the checkout process for guest users on an e-commerce platform. It ensures that a guest user can successfully add products to their cart and complete the checkout process by signing up.

## Setup
1. cd limehome/Frontend and run `yarn install`
2. run `yarn playwright install`

## Running the Test

1. run `yarn test` to tun the test
2. By default, the tests are run using a single worker. Running even two parallel nodes slows down the site and can cause the server to return 404 errors for some tests. Therefore, the default is set to 1 to run tests in serial mode. You can change the number of workers by running tests with `yarn test --workers=n`.


## Reports

The HTML report opens automatically upon the completion of tests. The results are saved in the `./html-test-results` directory as the file `index.html`.

## Overview

The tests are run on Chrome, Firefox and Webkut browsers. The test suite focuses on a critical user journey: completing a purchase as a guest user by signing up during the checkout process. It covers the following steps:

1. **Product Search**: Searches for a product and verifies that the search results are displayed.
2. **Add Product to Cart**: Opens the first available product from the search results, selects a size, and adds it to the cart.
3. **Checkout as Guest**: Proceeds to checkout as a guest user.
4. **Sign Up**: Registers a new user account and fills in address details during the checkout process.
5. **Accept Terms and Continue**: Accepts terms and conditions and continues the checkout process after shipping details are provided.
6. **Payment and Order Confirmation**: Makes payment via bank wire and confirms the order, capturing the order reference.
7. **Verify Order Placement**: Navigates to order history to verify that the order was placed successfully using the captured order reference.

## Test Environment

The test suite utilizes a set of utility functions and fixtures defined in `../utils/fixtures` to set up the test environment, manage page objects, and facilitate interactions with the web application under test.