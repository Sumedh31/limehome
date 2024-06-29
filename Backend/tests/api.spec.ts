import { test } from '../utils/fixture';

test.describe('Adding products in logged out state', () => {
  test('User should be able to add products in cart', async ( {apiSetup} ) => {
    const text = await apiSetup.getPropertyDetails();
    const text2 = await apiSetup.getPropertyDetails(); 
  });
});
