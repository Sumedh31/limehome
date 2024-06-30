import { test } from '../utils/fixtures';

// Test suite searching products
test.describe('Search product tests', () => {
    
    test('Veirfy that search suggestions are displayed ', async ({ setup, home }) => {
        // Step 1: Search for product
        await home.searchForProduct('blouse');

        // Step 2: Verify search suggestions
        await home.verifyRelevantSearchSuggestionsDisplayed('blouse');
    });

    test('Veirfy search results can be sorted with high to low', async ({ setup, home }) => {
        // Step 1: Search for product
        const searchResults = await home.searchForProductAndSubmit('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Step 2: Sort by highest price
        await searchResults.sortByHighestFirst();
        await searchResults.verifyPriceHighToLow();

        // Step 3: Sort by lowest price
        await searchResults.sortByLowesetFirst();
        await searchResults.verifyPriceLowToHigh();
    });

    test('Veirfy search results can be sorted with lowest to high', async ({ setup, home }) => {
        // Step 1: Search for product
        const searchResults = await home.searchForProductAndSubmit('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Step 3: Sort by lowest price
        await searchResults.sortByLowesetFirst();
        await searchResults.verifyPriceLowToHigh();
    });

    test('Verify you can compare products from search results', async ({ setup, home }) => {
        // Step 1: Search for product
        const searchResults = await home.searchForProductAndSubmit('dresses');
        await searchResults.ensureResultsAreDisplayed();

        // Step 2: Add two products to compare
        const {firstProductPrice, secondProductPrice, compareProducts} = await searchResults.addTwoProductsToCompare();

        // Step 3: Verify the products are added to compare and the prices match
        await compareProducts.verifyCorrectNumberOfProductsInCompare(2);
        await compareProducts.verifyProductPricesMatch(firstProductPrice, secondProductPrice);
    });
});
